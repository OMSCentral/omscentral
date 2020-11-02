import { notFound } from '@hapi/boom';

import { QueryResolvers } from '../../graphql';
import { getUser } from '../../functions';

type Resolver = QueryResolvers['user'];

export const resolver: Resolver = async (_, { id }) => {
  const user = await getUser(id);
  if (!user) {
    throw notFound();
  }
  return user;
};
