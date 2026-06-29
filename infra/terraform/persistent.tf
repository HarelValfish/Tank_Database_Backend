# ─── NAT EIP ─────────────────────────────────────────────────────────
# Persists across destroy/apply — same public IP so MongoDB Atlas allowlist
# never needs updating.
resource "aws_eip" "nat" {
  domain = "vpc"
  lifecycle { prevent_destroy = true }
}

# ─── Route53 zone ─────────────────────────────────────────────────────
# Persists across destroy/apply — nameservers never change so Namecheap
# custom NS is a one-time setup.
resource "aws_route53_zone" "main" {
  name = "harelvalfish.dev"
  lifecycle { prevent_destroy = true }
}

output "nat_eip" {
  value       = aws_eip.nat.public_ip
  description = "Static NAT IP — keep this in MongoDB Atlas allowlist"
}

output "route53_nameservers" {
  value       = aws_route53_zone.main.name_servers
  description = "Set these as custom nameservers in Namecheap (one-time setup)"
}
