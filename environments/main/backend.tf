terraform {
  backend "gcs" {
    bucket = "utilitarian-bee-244108-tfstate"
    prefix = "env/main"
  }
}