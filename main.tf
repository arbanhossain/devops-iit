resource "google_cloud_run_service" "cloud-run-tf" {
    name = "cloud-run-tf"
    location = "us-central1"
    project = "utilitarian-bee-244108"

    template {
        spec {
            containers {
                image = "gcr.io/utilitarian-bee-244108/asdasdasd:latest"
                ports {
                    container_port = 3000
                }
            }
        }
    }
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
  location    = google_cloud_run_service.cloud-run-tf.location
  project     = google_cloud_run_service.cloud-run-tf.project
  service     = google_cloud_run_service.cloud-run-tf.name

  policy_data = data.google_iam_policy.noauth.policy_data
}