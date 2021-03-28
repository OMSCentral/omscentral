import knex, { Config } from 'knex';
import { Model } from 'objection';

import { PhaseFunction } from '../components';
import { appConfig, postgresConfig } from '../config';

export const phase: PhaseFunction = (app, next) => {
  const ssl = appConfig.environment === 'production';

  const queryString = ssl ? 'sslmode=require' : '';

  const knexConfig: Config = {
    client: 'pg',
    connection: {
      connectionString: `${postgresConfig.connection}?${queryString}`,
      ssl,
    },
  };

  Model.knex(knex(knexConfig));

  next();
};
