import React from 'react';
import { reviewMeta } from 'src/constants/reviewMeta';
import { semesterMeta } from 'src/constants/semesterMeta';
import { Option, QueryParam, ReviewSortKey as SortKey } from 'src/core';
import useCurrentCourses from 'src/core/hooks/useCurrentCourses';
import useQueryParams from 'src/core/hooks/useQueryParams';
import {
  useCoursesQuery,
  useReviewsQuery,
  useSemestersQuery,
} from 'src/graphql';

import Toolbar, { Props as ChildProps } from './Toolbar';

type Props = Omit<
  ChildProps,
  | 'courseFilterOptions'
  | 'semesterFilterOptions'
  | 'reviewFilterOptions'
  | 'sortKeyOptions'
>;

const sortKeyOptions = [
  { value: SortKey.Semester, label: 'Semester' },
  { value: SortKey.Created, label: 'Created' },
];

const ToolbarContainer: React.FC<Props> = (props) => {
  const { query } = useQueryParams<{ [QueryParam.Query]: string }>();
  const currentCourses = useCurrentCourses();

  const courses = useCoursesQuery();
  const semesters = useSemestersQuery();
  const reviews = useReviewsQuery();

  const courseFilterOptions: Option[] = (courses.data?.courses ?? []).map(
    (course) => ({
      value: course.id,
      label: `${course.id} ${course.name}`,
    }),
  );

  const currentCoursesSemesters = new Set(
    currentCourses.reduce<string[]>(
      (ids, course) => [...ids, ...(course.metric?.semesters ?? [])],
      [],
    ),
  );

  const semesterFilterOptions: Option[] = (semesters.data?.semesters ?? [])
    .filter(
      (semester) =>
        !currentCourses.length || currentCoursesSemesters.has(semester.id),
    )
    .map((semester) => ({
      value: semester.id,
      label: semesterMeta.translateSeason(semester.season),
    }));

  const reviewFilterOptions: Option[] = (reviews.data?.reviews ?? [])
    .filter(
      (review) =>
        !currentCourses.length ||
        currentCoursesSemesters.has(review.semester.id),
    )
    .map((review) => ({
      value: review?.difficulty?.toString() || '',

      label: reviewMeta.translateDifficulty(
        parseInt(review?.difficulty?.toString() || ''),
      ),
    }));

  return (
    <Toolbar
      {...props}
      {...(query
        ? {
            courseFilterOptions: [],
            semesterFilterOptions: [],
            reviewFilterOptions: [],
            sortKeyOptions,
          }
        : {
            courseFilterOptions,
            semesterFilterOptions,
            reviewFilterOptions,
            sortKeyOptions,
          })}
    />
  );
};

export default ToolbarContainer;
