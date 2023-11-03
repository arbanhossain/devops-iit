resource "google_cloud_run_v2_service" "cloud-run-tf" {
    name = "cloud-run-tf"
    location = "us-central1"

    template {
        containers {
            image = "gcr.io/utilitarian-bee-244108/asdasdasd:latest"
            ports {
                container_port = 3000
            }
        }
    }
}