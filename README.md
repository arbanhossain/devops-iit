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

![Two diagrams, one showing container scaling, the other showing database scaling](https://cdn.discordapp.com/attachments/1168215886465863844/1170178918746161233/image.png?ex=6558190b&is=6545a40b&hm=54d42e00d5b7ae880f2de7728dd0ca7e21cc42fe22252c58ecf6b5b9be2446c3&)

**Database**: For the problem at hand, the primary bottleneck seems to be the database. As the system will see a huge spike in traffic only during few days of a month, expending resources on-demand is the better choice. Traditional databases can usually scale only vertically, with horizontal scaling increasing complicacies. Using a <u>distributed database system</u> will allow for dynamic resource allocation. PlanetScale, powered with Vitess, partitions a large database into smaller parts. This reduces load on a single machine, and allows better scaling.

**Containers**: Google Cloud Platform allows adjusting the number of container instances based on demand. We set a minimum number of instances (1), and set it to scale whenever the need arises. This allows for better resource utilization, and reduces costs.

<p align="center">
  <h2>Challenge 3</h2>
</p>

**Objective**: Security

As the system will be handling sensitive data, we implement OTP-based authentication along with JSON web tokens. To prevent brute-force attacks, we implement rate-limiting using Cloudflare's DDoS proxies and GCP's firewall configuration. The database is configured to allow traffic only from the backend. This ensures that the database is not exposed to the internet.

<p align="center">
  <h2>Challenge 4</h2>
</p>

**Objective**: Monitoring

The Google Cloud Monitoring Stack provides a comprehensive set of tools to monitor the backend.

![](https://media.discordapp.net/attachments/1170137836125691914/1170198774602272768/image.png?ex=65582b89&is=6545b689&hm=b0f9dc5d11d0b5734b576ae4ff245a32d03a72370378582a2b37628545f79383&=&width=1416&height=670)

For tracking errors, profiling performance of code blocks for both the backend and frontend, we use Sentry. Sentry's dashboard provides feedback to the developers from the operations, providing stack traces, detailing performance of functions. These help the developers to figure out bottlenecks on the system, or where the system is failing.

![](https://media.discordapp.net/attachments/1170137836125691914/1170144595435335792/20231104053331.gif?ex=6557f913&is=65458413&hm=ba1c0822ac56b8c00ec2d4e11a7486bacc38fec953cc789a68b9493bf799e631&=&width=1191&height=670)

Sentry issues are integrated with GitHub issues, providing a more coherent issue tracking system for the Ops team and the Dev team. The project is also configured to alert the developers on Slack whenever some certain preset conditions are met.

![](https://cdn.discordapp.com/attachments/1170137836125691914/1170137931860680765/image.png?ex=6557f2df&is=65457ddf&hm=35ec1d42cf4c97b66171f4c4e7988c61980095c978fba6d0c743c283e4190dd8&)