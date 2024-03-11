# Home Library Service (updated)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```bash
git clone https://github.com/lazy-goose/nodejs2024Q1-service.git
```

## Installing NPM modules

```bash
npm install
```

__Note:__ `.env` file will be automatically created from `.env.example` file.

## Running application

```bash
npm run start
```

After starting the app on port (4000 as default)
<!-- you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/. -->

To run the application with automatic restart use:

```bash
npm run start:dev
```

## Swagger

To preview `doc/api.ymp` file, you can use the VSCode extension: `Arjun.swagger-viewer`.

## Testing

After application was started open new terminal and enter:

<!-- To run all tests without authorization -->

```bash
npm run test
```

To run only one of all test suites

```bash
npm run test -- <path to suite>
```

__Note:__ Before running any test case you must run application (see `Running application`)

<!-- To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
``` -->

### Auto-fix and format

```bash
npm run lint
```

```bash
npm run format
```

### Debugging in VSCode

Press <kbd>Ctrl + Shift + D</kbd> to open menu `Run And Debug`, click `JavaScript Debug Terminal` and enter your command in opened terminal (do not forger to place Breakpoints in your code). Example of command:
```bash
npm run test
```

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
