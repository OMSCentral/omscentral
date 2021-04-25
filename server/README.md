# omscentral-server

Node.js GraphQL express server for [omscentral.com](https://omscentral.com).

## Tech

- [postgres](https://www.postgresql.org/)
- [knex](http://knexjs.org/)
- [objection](https://vincit.github.io/objection.js/)
- [express](https://expressjs.com/)
- [graphql](https://graphql.org/)
- [firebase](https://firebase.google.com/)

## Getting Started

Install dependencies:

```sh
npm ci
```

## Postgres

The server requires a postgres database connection. After installing Postgres, create a local database and a user. For example:

```sql
CREATE DATABASE omscentral_scratch;
CREATE USER omscentral WITH PASSWORD 'password';
ALTER USER omscentral WITH SUPERUSER;
```

For the above example, postgres connection string would be `postgres://omscentral:password@localhost:5432/omscentral_scratch`.

## Firebase

If you have not already, create a new project in the [Firebase Console](https://console.firebase.google.com). Once the project is created, click "Add app" from the "Project Overview" page to add a new "Web" app to the project.

This Firebase app will handle authentication for your local OMSCentral instance. Go to "Build" > "Authentication" and click on "Get Started". Under "Sign-in method", enable "Email/Password".

Next, go to "Build" > "Realtime Database" and click on "Create Database" to create a database for your project.

Finally, go to "Settings" > "Service accounts" tab, click "Generate new private key", and open the generated JSON.

## Environment Variables

First, copy the default environment variables file:

```sh
cp .env.example .env
```

Then, complete `.env` based on the following expectations:

| variable                         | description                                                                                   |
| -------------------------------- | --------------------------------------------------------------------------------------------- |
| NODE_ENV                         | `"local"`, `"test"`, OR `"production"` (recommend `"local"`)                                  |
| PORT                             | port expected by `../client` (recommend `8080` ... must not be `3000`)                        |
| OMSCENTRAL_CORS_ALLOWLIST        | OPTIONAL: comma-delimited list of allowed CORS origins (leave empty for no CORS)              |
| OMSCENTRAL_DISABLE_RATE_LIMIT    | OPTIONAL: if `true`, disables api rate limiting                                               |
| OMSCENTRAL_GRAPHQL_PLAYGROUND    | OPTIONAL: if `true`, graphql playground is enabled at `<host>/graphql`                        |
| OMSCENTRAL_GRAPHQL_REPORT_SCHEMA | OPTIONAL: if `true`, reports schema to apollo studio                                          |
| OMSCENTRAL_LOG_LEVEL             | OPTIONAL: winston log level                                                                   |
| OMSCENTRAL_MORGAN_FORMAT         | OPTIONAL: predefined [morgan format](https://www.npmjs.com/package/morgan#predefined-formats) |
| OMSCENTRAL_NAME                  | OPTIONAL: human-readable instance name for logging                                            |
| OMSCENTRAL_FIREBASE_PRIVATE_KEY  | from firebase private key json                                                                |
| OMSCENTRAL_FIREBASE_CLIENT_EMAIL | from firebase private key json                                                                |
| OMSCENTRAL_FIREBASE_PROJECT_ID   | from firebase private key json                                                                |
| OMSCENTRAL_FIREBASE_DATABASE_URL | URL of the database that you created under the Firebase section above                         |
| OMSCENTRAL_POSTGRES_CONNECTION   | postgres connection string                                                                    |
| OMSCENTRAL_SENTRY_DSN            | OPTIONAL: sentry uri for issue logging                                                        |
| APOLLO_KEY                       | OPTIONAL: api key for apollo studio metrics logging                                           |
| SEARCHBOX_URL                    | OPTIONAL: elastic search web api host URI                                                     |
| SEARCHBOX_SSL_URL                | OPTIONAL: elastic search web api host URI (overrides `SEARCHBOX_URL`)                         |

## Migrations

Before starting the api server, make sure the database migrations are up to date:

```sh
npm run knex migrate:latest
```

If this fails, check the `OMSCENTRAL_POSTGRES_CONNECTION` environment variable and make sure it's configured correctly. If still unsuccessful, try `DEBUG=knex/* npm run knex migrate:latest` to print debugging information to the console to aid in troubleshooting.

## Start

To start server in development mode w/hot-reloading:

```sh
npm run dev
```

To start server in production mode after transpiling TypeScript to JavaScript:

```sh
npm run build
npm start
```

## GraphQL

To engage with the graphql inspector, visit `/graphql` route of the api server in your browser. Note that this requires the playground environment variable to be enabled.

The [staging graphql inspector](https://omscentral-api-staging.herokuapp.com/graphql) is useful for interacting with production-like data.

## Deployment

Merging/pushing to `staging` initiates a deployment to the staging environment after CI passes in github. Once verified in staging, the build is manually promoted to production when appropriate.
