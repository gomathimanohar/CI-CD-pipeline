# CI/CD Pipeline — Demo App

A minimal **Express** web app used to learn and demonstrate a **Jenkins** pipeline that builds a **Docker** image, pushes it to a registry, and runs the container locally.

## What it does

- Serves a simple HTML response on `GET /` (port **3000**).
- `package.json` scripts: `start`, `dev` (nodemon), `test` (placeholder).

## Prerequisites

- **Node.js** 18 or newer
- **Docker** (for image build/run and for the Jenkins stages that match this repo)
- **Jenkins** with Docker / Pipeline and (for push) credentials to your registry

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

For development with auto-restart:

```bash
npm run dev
```

## Run with Docker

```bash
docker build -t ci-cd-demo-app .
docker run -p 3000:3000 ci-cd-demo-app
```

## Jenkins pipeline (`jenkinsfile`)

The pipeline runs these stages in order:

| Stage | Purpose |
|--------|---------|
| Checkout Code | Clone the repo (default: `main`) |
| Install Dependencies | `npm install` |
| Run Tests | `npm test` (non-blocking with `\|\| true` in the sample) |
| Build Docker Image | `docker build` |
| Tag Image | Tag for the configured registry/name |
| Push Image | Push to the registry (uses Jenkins credentials id `dockerhub-creds`) |
| Deploy | Stop/remove old container, run new image on port 3000 |

Post-build messages indicate success or failure.

### Using this in your environment

Update the `jenkinsfile` for your setup:

- **Git URL** and branch in the Checkout stage
- **`REGISTRY`** and **`IMAGE_NAME`** in `environment`
- **`credentialsId`** for `withDockerRegistry` to match your Jenkins credential store

---

Personal learning notes: **gomathimanohar** · License: **ISC**
