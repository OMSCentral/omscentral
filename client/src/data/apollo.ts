import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import * as sentry from '@sentry/browser';

import { apolloConfig } from 'src/config';
import { browserHistory, paths } from 'src/constants';
import storage from 'src/core/utils/storage';

/* eslint-disable no-useless-computed-key */
const errorCodes: { [key: string]: number } = {
  ['Bad Request']: 400,
  ['Unauthorized']: 401,
  ['Forbidden']: 403,
  ['Not Found']: 404,
};
/* eslint-enable no-useless-computed-key */

const error = onError(({ networkError, graphQLErrors, operation }) => {
  sentry.captureException(null, {
    level: sentry.Severity.Critical,
    extra: {
      networkError,
      graphQLErrors,
      operation,
    },
  });

  const { message } = (graphQLErrors || [])[0] || {};
  const code = errorCodes[message] || 500;
  browserHistory.push(paths.error(code));
});

const before = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: storage('session').getItem('token') || null,
    },
  });

  return forward(operation);
});

const http = new HttpLink({
  uri: apolloConfig.uri,
});

const client = new ApolloClient({
  link: ApolloLink.from([error, before, http]),
  cache: new InMemoryCache(),
});

export default client;
