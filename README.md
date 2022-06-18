# Belvo Wallet Challenge

## Requirements

- **[Node.js](https://nodejs.org/)**.
  - This project was built using the latest LTS (v16). I recommend using [NVM](https://github.com/nvm-sh/nvm) to manage your node versions.
- **npm** (included by default with the Node.js)

## Optional Requirements

- [Docker](https://docs.docker.com/get-docker/)

## Setup

### Install project dependencies

```shell
npm install
```

## Development

Both options will serve with hot reload at `localhost:3000`

### Using local Node/npm

```shell
# serve with hot reload at localhost:3000
npm run start
```

### Using docker-compose

```shell
docker-compose up dev-server
```

### Code Quality tools

This project includes the following tools to ensure code quality and consistency:

- Prettier
- ESLint
- Stylelint

```shell
# lint js code
npm run lint:js

# lint css code
npm run lint:css

# lint both
npm run lint

# check code formatting
npm run prettier:check

# fix code formatting
npm run prettier:fix
```

### Testing

```shell
# run tests
npm test

# run tests with live watch for uncommited code
npm test -- --watch

# generate coverage report
npm test -- --coverage
```

## Build for production

```shell
# code will be generated in ./dist folder
npm run build
```

## Serving production build

### Using local Node/npm

```shell
# requires that you've already built for production
npx serve -s dist
```

### Using docker-compose

```shell
# doesn't require previous build
docker-compose up dist-server
```
