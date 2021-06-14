import * as sentry from '@sentry/browser';
import qs from 'query-string';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { QueryParam, ReviewSortKey as SortKey } from 'src/core';
import useQueryParams from 'src/core/hooks/useQueryParams';
import asArray from 'src/core/utils/asArray';
import useSession from 'src/core/utils/useSessionStorage';
import { ReviewsQueryVariables, useReviewsQuery } from 'src/graphql';

import ReviewCardListConnected from './ReviewCardListConnected';

interface Props {
  variables?: ReviewsQueryVariables;
  pagination?: boolean;
  before?: JSX.Element;
}

const ReviewCardListConnectedContainer: React.FC<Props> = ({
  variables,
  pagination = true,
  before,
}) => {
  const history = useHistory();
  const location = useLocation();

  const params =
    useQueryParams<{
      [QueryParam.Course]: string[];
      [QueryParam.Semester]: string[];
      [QueryParam.Sort]: SortKey;
      [QueryParam.Difficulty]: string[];
    }>();

  const courseFilter = asArray<string>(variables?.course_ids || params.course);
  const semesterFilter = asArray<string>(params.semester);
  const difficultyFilter = asArray<string>(params.difficulty);

  const sortKey = params.sort || SortKey.Created;

  const [paginate, setPaginate] = useState(pagination);
  const [limit, setLimit] = useSession('rcl:l', paginate ? 10 : 10e6);

  const reviews = useReviewsQuery({
    variables: {
      ...(variables || {}),
      limit,
      order_by_desc: [sortKey, SortKey.Created],
      course_ids: courseFilter,
      semester_ids: semesterFilter,
      difficulties: difficultyFilter,
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleLoadMore = async () => {
    if (reviews.loading) {
      return;
    }

    try {
      await reviews.fetchMore({
        variables: {
          offset: reviews.data!.reviews!.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult?.reviews?.length) {
            setPaginate(fetchMoreResult.reviews.length >= limit);
            return {
              ...prev,
              reviews: prev.reviews.concat(fetchMoreResult.reviews),
            };
          } else {
            setPaginate(false);
            return prev;
          }
        },
      });
    } catch (error) {
      sentry.captureException(error, {
        level: sentry.Severity.Error,
        extra: {
          ...variables,
          last_offset: reviews.data?.reviews?.length,
        },
      });
    }
  };

  const handleFilterChange =
    (param: QueryParam, oldFilter: string[]) => (newFilter: string[]) => {
      if (newFilter.sort().join(',') !== oldFilter.sort().join(',')) {
        setLimit(10);

        history.push({
          search: qs.stringify({
            ...qs.parse(location.search),
            [param]: newFilter,
          }),
        });
      }
    };

  const handleCourseFilterChange = handleFilterChange(
    QueryParam.Course,
    courseFilter,
  );

  const handleSemesterFilterChange = handleFilterChange(
    QueryParam.Semester,
    semesterFilter,
  );

  const handleReviewFilterChange = handleFilterChange(
    QueryParam.Difficulty,
    difficultyFilter,
  );

  const handleSortKeyChange = (key: SortKey) => {
    if (key !== sortKey) {
      setLimit(10);

      history.push({
        search: qs.stringify({
          ...qs.parse(location.search),
          sort: key,
        }),
      });
    }
  };

  return (
    <ReviewCardListConnected
      loading={reviews.loading}
      reviews={reviews.data?.reviews}
      courseFilter={variables?.course_ids == null ? courseFilter : undefined}
      onCourseFilterChange={handleCourseFilterChange}
      semesterFilter={semesterFilter}
      onSemesterFilterChange={handleSemesterFilterChange}
      reviewFilter={difficultyFilter}
      onReviewFilterChange={handleReviewFilterChange}
      sortKey={sortKey}
      onSortKeyChange={handleSortKeyChange}
      onLoadMore={
        paginate &&
        reviews.data?.reviews?.length &&
        reviews.data.reviews.length >= limit
          ? handleLoadMore
          : undefined
      }
      before={before}
      highlight={variables?.query?.toLowerCase()}
    />
  );
};

export default ReviewCardListConnectedContainer;
