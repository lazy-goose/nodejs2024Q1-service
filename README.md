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

- app <- node:20-alpine
- database <- postgres:alpine

They are connected with each other through user-defined bridge network `custom-network`

When app container starts it will automatically migrate prisma to test database

⚠️ To generate a `prisma-client` you need to run `npx prisma generate` inside `app` container (or use command: `npm run prisma:generate`)

### Download docker compose image (optional)

```bash
docker pull lazygoose/nodejs2024q1-service-dev
```

### Spin up docker

```bash
docker compose watch
```

**Note:** Run all `docker compose` commands inside projects root folder

To print logs from started image create another terminal process and run:

```bash
docker compose up
```

**Note:** If you do not want to rebuild project on `src/files` change then run only `docker compose up` command

### Stop docker

```bash
docker compose down --rmi local
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
docker prune
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
