terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
    }
  }
}

provider "google" {
  project = "utilitarian-bee-244108"
  region  = "us-central1"
  zone    = "us-central1-c"
}