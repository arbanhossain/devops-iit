terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.44.1"
    }
  }
}

provider "google" {
  project = "utilitarian-bee-244108"
  region  = "us-central1"
  zone    = "us-central1-c"
  credentials = "./key.json"
}