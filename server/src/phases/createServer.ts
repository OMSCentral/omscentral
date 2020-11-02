import { ApolloServer } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';
import { Response } from 'express';
import fs from 'fs';
import path from 'path';

import { appConfig } from '../config';
import { Context, Request } from '../types';
import { getUser } from '../functions';
import { graphqlConfig } from '../config';
import { logger } from '../components';
import { Mutation, Query, permissions } from '../api';
import { PhaseFunction } from '../components';
import { root } from '../constants';

export const phase: PhaseFunction = (app, next) => {
  const schemaFile = path.join(root, 'src', 'graphql', 'schema.graphql');
  const schema = applyMiddleware(
    makeExecutableSchema<Context>({
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      typeDefs: fs.readFileSync(schemaFile, 'utf8'),
      resolvers: {
        Query,
        Mutation,
      },
    }),
    permissions,
  );

  const server = new ApolloServer({
    schema,
    resolvers: {
      Query,
      Mutation,
    },
    context: async ({ req, res }: { req: Request; res: Response }) => {
      const { userId } = req;

      return {
        req,
        res,
        user: userId ? await getUser(userId) : null,
        logger,
      };
    },
    playground: graphqlConfig.playground,
    engine: {
      reportSchema: graphqlConfig.reportSchema,
      graphVariant: 'current',
    },
  });

  app.set('server', server);
  app.set('port', appConfig.port);

  next();
};
