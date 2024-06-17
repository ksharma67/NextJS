# Deploying a Dockerized Next.js Application

This repository contains a Dockerized Next.js application.

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)

## Getting Started

### Clone the Repository

First, clone this repository to your local machine:
```bash
git clone https://github.com/ksharma67/NextJS
cd NextJS
```

### Build the Docker Image

To build the Docker image for the Next.js application, run the following command:
```bash
docker build -t nextjs-app .
```

### Run the Docker Container

Once the Docker image is built, you can run a Docker container with the following command:
```bash
docker run -p 3000:3000 nextjs-app
```

This command maps port 3000 of the Docker container to port 3000 of your local machine. You can replace 3000:3000 with any other port if needed.

### Accessing the Application
After running the container, you can access the Next.js application at http://localhost:3000 in your web browser.
