Frontend: https://github.com/saadman-sakib/devops-frontend

<p align="center">
  <h2>Architecture Overview</h2>
</p>

![Image of complete architecture]()

#### Tools and Technologies
**Backend**: NestJS, Google Cloud Platform
**Frontend**: NextJS, Vercel
**Database**: PlanetScale, MySQL
**CI/CD Pipeline**: Git, GitHub Actions, Google Cloud Build, Terraform
**Containerization**: Docker, Google Container Registry
**Monitoring**: Google Operations Suite, Vercel Analytics, PlanetScale Insights

<p align="center">
  <h2>Challenge 1</h2>
</p>

**Objective**: Dependable CI/CD Pipeline

![Git Workflow Diagram](https://gcdnb.pbrd.co/images/zL0Q8mCtT0Mw.png?o=1)

A build is published everytime a commit is pushed to the `main` branch. GitHub Actions triggers a build on the Terraform stack. The Terraform stack is responsible for provisioning the infrastructure on Google Cloud Platform. It executes the `cloudbuild.yaml` build script which builds the Docker image and pushes it to Google Container Registry. The image is then deployed to Google Cloud Run.


<p align="center">
  <h2>Challenge 2</h2>
</p>

**Objective**: Scalable infrastructure

![Two diagrams, one showing container scaling, the other showing database scaling]()

**Database**: For the problem at hand, the primary bottleneck seems to be the database. As the system will see a huge spike in traffic only during few days of a month, expending resources on-demand is the better choice. Traditional databases can usually scale only vertically, with horizontal scaling increasing complicacies. Using a <u>distributed database system</u> will allow for dynamic resource allocation. PlanetScale, powered with Vitess, partitions a large database into smaller parts. This reduces load on a single machine, and allows better scaling.

**Containers**: Google Cloud Platform allows adjusting the number of container instances based on demand. We set a minimum number of instances (1), and set it to scale whenever the need arises. This allows for better resource utilization, and reduces costs.

<p align="center">
  <h2>Challenge 3</h2>
</p>

**Objective**: Security

![]()

As the system will be handling sensitive data, we implement OTP-based authentication along with JSON web tokens. To prevent brute-force attacks, we implement rate-limiting using Cloudflare's DDoS proxies and GCP's firewall configuration. The database is configured to allow traffic only from the backend. This ensures that the database is not exposed to the internet.