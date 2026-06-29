# Repo Separation Plan

## Proposed split

### `Tank_Database_Backend` (owns infrastructure)
```
backend/              ← Express API (unchanged)
infra/terraform/      ← all Terraform (unchanged)
k8s/                  ← all k8s manifests (unchanged)
.github/workflows/ci-cd.yml
```

### `Tank_Database_Frontend` (pure UI)
```
frontend/             ← React/Vite app (unchanged)
.github/workflows/ci-cd.yml
```

Rationale: infrastructure naturally belongs with the backend. The frontend repo becomes a clean, focused UI codebase whose CI/CD only needs to push an image and swap it into the running deployment.

---

## CI/CD changes

### Backend repo CI/CD (keeps current structure)
- test → push backend image to ECR → apply k8s manifests → rolling update backend

### Frontend repo CI/CD (simpler)
- build → push frontend image to ECR → `kubectl set image deployment/frontend`
- No terraform, no manifest apply, no secret sync — those live in the backend repo

---

## GitHub secrets (both repos need these)
| Secret | Backend | Frontend |
|---|---|---|
| `AWS_DEPLOY_ROLE_ARN` | ✓ | ✓ |
| `ADMIN_KEY` | ✓ | — |
| `MONGO_URI` | ✓ | — |

---

## IAM trust policy update
The GitHub OIDC role currently only trusts `HarelValfish/Tank_Database`.
After the split, update `modules/iam/main.tf` to trust both repos:

```hcl
StringLike = {
  "token.actions.githubusercontent.com:sub" = [
    "repo:HarelValfish/Tank_Database_Backend:*",
    "repo:HarelValfish/Tank_Database_Frontend:*"
  ]
}
```

---

## Terraform Cloud

Terraform Cloud replaces two things: the S3 state backend and local `terraform.tfvars`.

### What changes

**`infra/terraform/versions.tf`** — swap S3 backend for Terraform Cloud:
```hcl
terraform {
  cloud {
    organization = "<your-org>"
    workspaces {
      name = "tank-db"
    }
  }
}
```

**`infra/terraform/terraform.tfvars`** — delete this file. Sensitive variables (`mongo_uri`, `admin_key`) move into the Terraform Cloud workspace as sensitive environment variables. No secrets on disk.

**`infra/terraform/variables.tf`** — no change needed.

### Workspace variable setup (one-time, in Terraform Cloud UI)
| Variable | Type | Sensitive |
|---|---|---|
| `mongo_uri` | Terraform | ✓ |
| `admin_key` | Terraform | ✓ |
| `AWS_ACCESS_KEY_ID` | Environment | ✓ |
| `AWS_SECRET_ACCESS_KEY` | Environment | ✓ |

### Workflow after Terraform Cloud is set up
- `terraform apply` locally → TF Cloud runs the plan remotely, state stored in TF Cloud
- Or trigger via VCS: connect the backend repo to the TF Cloud workspace so any push to `infra/terraform/` automatically plans/applies
- State is never local, never in S3 — TF Cloud UI shows full history of every apply

### Why Terraform Cloud over S3
| | S3 backend | Terraform Cloud |
|---|---|---|
| State storage | S3 bucket (costs ~$0) | TF Cloud (free tier) |
| Secrets | `terraform.tfvars` on disk | Stored in workspace, never local |
| Plan history | None | Full audit log |
| Team access | AWS console only | TF Cloud UI |
| Remote runs | No | Yes (optional) |

---

## Migration steps

1. ✅ Rename GitHub repo to `Tank_Database_Backend`
2. ✅ Create `Tank_Database_Frontend` repo and push frontend code
3. Update IAM trust policy in `modules/iam/main.tf` — already done
4. Run `terraform apply -target=module.iam` to apply the trust policy change
5. Add GitHub secrets to both repos
6. **Terraform Cloud migration:**
   a. Create account at app.terraform.io
   b. Create organization + workspace named `tank-db`
   c. Add workspace variables (mongo_uri, admin_key, AWS credentials)
   d. Update `versions.tf` to use `cloud {}` backend
   e. Run `terraform init` to migrate state from S3 to TF Cloud
   f. Delete `terraform.tfvars` and add to `.gitignore`
7. Push a commit to each repo to verify CI/CD end to end

---

## Gotchas

- **Shared ECR**: both repos push to the same ECR account — no change needed, access is via the shared IAM role
- **k8s manifests stay in backend repo**: if the frontend repo needs a manifest change (e.g. resource limits), that PR goes to the backend repo
- **terraform.tfvars**: delete after migrating secrets to TF Cloud workspace
- **S3 state bucket**: can be deleted after `terraform init` successfully migrates state to TF Cloud
- **frontend/.env**: never committed — keep locally in the frontend repo
