resource "google_cloud_run_service" "cloud-run-tf-dev" {
    name = "cloud-run-tf-dev"
    location = "us-central1"
    project = "utilitarian-bee-244108"

    template {
        spec {
            containers {
                image = "gcr.io/utilitarian-bee-244108/dev:latest"
                ports {
                    container_port = 3000
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

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.cloud-run-tf-dev.location
  project     = google_cloud_run_service.cloud-run-tf-dev.project
  service     = google_cloud_run_service.cloud-run-tf-dev.name

  policy_data = data.google_iam_policy.noauth.policy_data
}