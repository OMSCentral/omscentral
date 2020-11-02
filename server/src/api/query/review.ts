import { notFound } from '@hapi/boom';

import { QueryResolvers } from '../../graphql';
import { getReview } from '../../functions';

type Resolver = QueryResolvers['review'];

export const resolver: Resolver = async (_, { id }) => {
  const review = await getReview(id);
  if (!review) {
    throw notFound();
  }
  return review;
};
