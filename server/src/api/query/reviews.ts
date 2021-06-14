import { searchReviews as search } from '../../functions';
import { QueryResolvers } from '../../graphql';
import { Review } from '../../models';

type Resolver = QueryResolvers['reviews'];

export const resolver: Resolver = async (
  _,
  {
    query,
    offset,
    limit,
    course_ids,
    author_ids,
    semester_ids,
    difficulties,
    order_by_desc,
  },
) => {
  if (query) {
    const ids = await search({ query, offset, limit, sort: order_by_desc });
    return ids.length ? Review.eagerQuery().whereIn('id', ids) : [];
  }
  return Review.eagerQuery().modify((qb) => {
    qb.offset(offset).limit(limit);
    course_ids.length && qb.whereIn('course_id', course_ids);
    author_ids.length && qb.whereIn('author_id', author_ids);
    semester_ids.length && qb.whereIn('semester_id', semester_ids);
    difficulties.length && qb.whereIn('difficulty', difficulties);
    order_by_desc.forEach((column) => qb.orderBy(column, 'desc'));
  });
};
