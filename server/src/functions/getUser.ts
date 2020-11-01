import { SingleQueryBuilder, QueryBuilder } from 'objection';

import { User } from '../models';

export const getUser = (id: string): SingleQueryBuilder<QueryBuilder<User>> =>
  User.eagerQuery().findById(id);
