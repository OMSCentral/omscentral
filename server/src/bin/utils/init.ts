import { Model } from 'objection';
import Knex from 'knex';

import knexConfig from '../../../database/knexfile';
import { logger } from '../../components';

export const init = async (main: () => any): Promise<void> => {
  Model.knex(Knex(knexConfig));
  await main();
  logger.info('done');
  process.exit(0);
};
