resource "google_cloud_run_service" "cloud-run-tf-main" {
    name = "cloud-run-tf"
    location = "us-central1"
    project = "utilitarian-bee-244108"

    template {
        spec {
            containers {
                image = "gcr.io/utilitarian-bee-244108/main:latest"
                ports {
                    container_port = 3000
                }
            }
            container_concurrency = 2-6
        }
    }

    timeouts {
      create = "5m"
    }

    autogenerate_revision_name = true
}

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