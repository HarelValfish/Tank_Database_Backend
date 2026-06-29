module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "tank-db-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["${var.aws_region}a", "${var.aws_region}b"]
  public_subnets  = ["10.0.0.0/24", "10.0.1.0/24"]
  private_subnets = ["10.0.10.0/24", "10.0.11.0/24"]

  enable_nat_gateway   = true
  single_nat_gateway   = true
  reuse_nat_ips        = true
  external_nat_ip_ids  = [var.nat_eip_allocation_id]
  enable_dns_hostnames = true

  public_subnet_tags  = { "kubernetes.io/role/elb"                          = "1" }
  private_subnet_tags = { "kubernetes.io/role/internal-elb"                 = "1" }
  tags                = { "kubernetes.io/cluster/${var.cluster_name}" = "shared" }
}
