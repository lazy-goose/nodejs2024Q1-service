# Home Library Service (updated:docker)

## Prerequisites

### General:

- Git - [Download page](https://git-scm.com/downloads).
- Node.js - [Download page](https://nodejs.org/en/download/) and the npm package manager.

### Docker:

#### Windows & Mac OS

- Docker desktop - [Download page](https://www.docker.com/products/docker-desktop/)

### Only for Linux

You also may need to install:

- Docker/scout-cli - [Git repository](https://github.com/docker/scout-cli)

- Docker/compose - [Git repository](https://github.com/docker/compose)

## Download repository

```bash
git clone https://github.com/lazy-goose/nodejs2024Q1-service.git
```

## Install npm packages

```bash
npm install
```

**Note:** `.env` file will be automatically created from `.env.example` file.

## 🐳 Docker. Running application

Docker compose creates two containers:

- app <- [lazygoose/home-service.app](https://hub.docker.com/r/lazygoose/home-service.app) <- node:20-alpine
- database <- [lazygoose/home-service.db](https://hub.docker.com/r/lazygoose/home-service.db) <- postgres:alpine

They are connected with each other through user-defined bridge network `custom-network`

When app container starts it will automatically migrate prisma to test database

⚠️ App images pulled from ️DockerHub:

```bash
docker pull lazygoose/home-service.app
```

```bash
docker pull lazygoose/home-service.db
```

⚠️ To generate `prisma-client` run `npm run prisma:generate`. It will run `npx prisma generate` inside host and container

### Spin up docker

```bash
docker compose watch
```

**Note:** Run all `docker compose` commands inside project root folder

To print logs of started image run in another terminal:

```bash
docker compose up
```

**Note:** If you do not want to rebuild project on `src/files` change, run only `docker compose up` command

⚠️ Before running these commands make sure to run `npm install`, it will create `.env` file

### Stop docker

```bash
docker compose down
```

### Useful docker commands

To scan composed image for vulnerabilities use:

```bash
npm run docker:scan
```

To print docker images and their sizes use:

```bash
docker image ls
```

To delete dangling untagged images use:

```bash
docker rmi -f $(docker images -q -f dangling=true)
```

## Testing (no authentication)

After application was started open new terminal and enter:

```bash
npm run test
```

To run only one of all test suites:

```bash
npm run test -- <path to suite>
```

**Note:** Before running any test case you must run application (see `Docker. Running application`)

## Linting & Formatting

```bash
npm run lint
```

```bash
npm run format
```

### Debugging in VSCode

Press <kbd>Ctrl + Shift + D</kbd> to open menu `Run And Debug` menu, choose `Debug docker nest.js app` and run debugger by pressing <kbd>F5</kbd> (do not forger to place Breakpoints in your code)

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
