import React from 'react';
import { ReviewSortKey as SortKey } from 'src/core';
import { ReviewsQuery } from 'src/graphql';

import ReviewCardList from '../ReviewCardList';
import Visibility from '../Visibility';
import Toolbar from './components/Toolbar';

interface Props {
  reviews?: ReviewsQuery['reviews'];
  courseFilter?: string[];
  onCourseFilterChange: (filter: string[]) => void;
  semesterFilter?: string[];
  onSemesterFilterChange: (filter: string[]) => void;
  reviewFilter?: string[];
  onReviewFilterChange: (filter: string[]) => void;
  sortKey?: SortKey;
  onSortKeyChange: (key: SortKey) => void;
  onLoadMore?: () => void;
  loading?: boolean;
  before?: JSX.Element;
  highlight?: string;
}

const ReviewCardListConnected: React.FC<Props> = ({
  reviews,
  courseFilter,
  onCourseFilterChange,
  semesterFilter,
  onSemesterFilterChange,
  reviewFilter,
  onReviewFilterChange,
  sortKey,
  onSortKeyChange,
  onLoadMore,
  loading,
  before,
  highlight,
}) => (
  <ReviewCardList
    loading={loading}
    reviews={reviews}
    highlight={highlight}
    before={
      <>
        {before}
        <Toolbar
          courseFilter={courseFilter}
          onCourseFilterChange={onCourseFilterChange}
          semesterFilter={semesterFilter}
          onSemesterFilterChange={onSemesterFilterChange}
          reviewFilter={reviewFilter}
          onReviewFilterChange={onReviewFilterChange}
          sortKey={sortKey}
          onSortKeyChange={onSortKeyChange}
        />
      </>
    }
    after={<Visibility onVisible={onLoadMore} />}
  />
);

export default ReviewCardListConnected;
