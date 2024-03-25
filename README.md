# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/).

## Downloading

```
git clone https://github.com/YaroslavaOdin/nodejs2024Q1-service
```
Switch to the branch `сontainerization-docker-database`.

## Installing NPM modules

```
npm install
```

## Create .env

You can set the port in the file .env. An example can be seen in the .env.example file. Default port - 4000.

## Running application
Start the docker containers:
```
npm run docker:compose
```
## Scan for vulnerabilities 
```
npm run docker:scan:app
```
```
npm run docker:scan:database
```

## Start the server

```
npm run start:dev
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
