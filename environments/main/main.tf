resource "google_cloud_run_service" "cloud-run-tf-main" {
    name = "cloud-run-tf-main"
    location = "us-central1"
    project = "utilitarian-bee-244108"

    template {
        spec {
            containers {
                image = "gcr.io/utilitarian-bee-244108/main:latest"
                ports {
                    container_port = 3000
                }
                env {
                  name = "DATABASE_HOST"
                  value = var.DATABASE_HOST
                }
                env {
                  name = "DATABASE_USERNAME"
                  value = var.DATABASE_USERNAME
                }
                env {
                  name = "DATABASE_PASSWORD"
                  value = var.DATABASE_PASSWORD
                }
                env {
                  name = "API_KEY"
                  value = var.API_KEY
                }
                env {
                  name = "SENDER_ID"
                  value = var.SENDER_ID
                }
                env {
                  name = "JWT_SECRET"
                  value = var.JWT_SECRET
                }
            }
            container_concurrency = 50
        }
    }

    timeouts {
      create = "5m"
    }

    autogenerate_revision_name = true
}


variable "DATABASE_HOST" {}
variable "DATABASE_USERNAME" {}
variable "DATABASE_PASSWORD" {} 
variable "API_KEY" {} 
variable "SENDER_ID" {} 
variable "JWT_SECRET" {} 

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.cloud-run-tf-main.location
  project     = google_cloud_run_service.cloud-run-tf-main.project
  service     = google_cloud_run_service.cloud-run-tf-main.name

  policy_data = data.google_iam_policy.noauth.policy_data
}