# omscentral

Monorepo for [omscentral.com](https://omscentral.com) containing the following projects:

- [GraphQL](./graphql/README.md)
- [Server](./server/README.md)
- [Client](./client/README.md)

## Getting Started

To install top-level dependencies:

```sh
npm ci
```

Before proceeding, follow the instructions in project-specific READMEs in the order above (graphql, server, then client).

## Scripts

### `npm run format`

Formats all source code and package.json.

### `npm test`

Tests services.

### `npm run dev`

Starts services in development mode w/hot-reload.

### `npm run build`

Builds services.

### `npm start`

Starts services in production mode. Note: You must run `npm run build` first.

### `npm run cypress`

Runs cypress integration tests that enforce correct behavior. Requires the application to be up with `npm run dev` or `npm start` first.

### `npm run cypress:clean`

When finished, users created during tests may be cleaned up using this script.
# omscentral

Monorepo for [omscentral.com](https://omscentral.com) containing the following projects:

- [GraphQL](./graphql/README.md)
- [Server](./server/README.md)
- [Client](./client/README.md)

## Getting Started

To install top-level dependencies:

```sh
npm ci
```

Before proceeding, follow the instructions in project-specific READMEs in the order above (graphql, server, then client).

## System Architecture overview
- OMSCentral is a course review website primarily written in [TypeScript](https://www.typescriptlang.org/). 
- This section provides a high level summary of the current architecture:

### Client/ Frontend
- The client allows an authenicated user(see User Authenication section ) to add or delete reviews or an modify existing review for a course.
- Libraries used: Facebook [React](https://reactjs.org/)
- Frameworks used: Google [material-ui](https://material-ui.com/) 

### Server/ Backend
- The server persists course reviews and semester information to the database(See Persistence section below).
- Frameworks used: Node.js based [express](https://expressjs.com/)

### Persistence
- The courses, semesters and reviews data is stored in a  relational database.
- Relational Database used: [postgres](https://www.postgresql.org/)
- The server reads and writes to postgres database using [graphql](https://graphql.org/).

## User Authenication 
- User authenication is a security layer.
- It allows a user to register his/her profile.
- After his/her credentials are verified at time of login, the user can modify review data after.
- Tools used: Google [Firebase](https://firebase.google.com/)

## Package management
- The third party dependencies are obtained using npm.
- Tools used: [npm](https://www.npmjs.com/)

For a system architecture diagram, please see [here](./diagrams/SystemArchitecture.png).

## Scripts

### `npm run format`

Formats all source code and package.json.

### `npm test`

Tests services.

### `npm run dev`

Starts services in development mode w/hot-reload.

### `npm run build`

Builds services.

### `npm start`

Starts services in production mode. Note: You must run `npm run build` first.

### `npm run cypress`

Runs cypress integration tests that enforce correct behavior. Requires the application to be up with `npm run dev` or `npm start` first.

### `npm run cypress:clean`

When finished, users created during tests may be cleaned up using this script.
