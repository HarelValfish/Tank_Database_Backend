resource "aws_acm_certificate" "main" {
  domain_name               = "harelvalfish.dev"
  subject_alternative_names = ["*.harelvalfish.dev"]
  validation_method         = "DNS"
  lifecycle { create_before_destroy = true }
}

# Auto-create the ACM validation CNAME records in Route53
resource "aws_route53_record" "acm_validation" {
  for_each = {
    for dvo in aws_acm_certificate.main.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      value  = dvo.resource_record_value
    }
  }

  zone_id         = aws_route53_zone.main.zone_id
  name            = each.value.name
  type            = each.value.type
  ttl             = 300
  records         = [each.value.value]
  allow_overwrite = true
}
