import React from 'react';
import { ReviewSortKey as SortKey } from 'src/core/types';
import { useCoursesQuery, useSemestersQuery } from 'src/graphql';

import Toolbar, { Props as ChildProps } from './Toolbar';

type Props = Omit<
  ChildProps,
  'courseFilterOptions' | 'semesterFilterOptions' | 'sortKeyOptions'
>;

const sortKeyOptions = [
  { value: SortKey.Semester, label: 'Semester' },
  { value: SortKey.Created, label: 'Created' },
];

const ToolbarContainer: React.FC<Props> = (props) => {
  const [courses, semesters] = [useCoursesQuery(), useSemestersQuery()];

  const courseFilterOptions =
    courses.data?.courses?.map((course) => ({
      value: course.id,
      label: `${course.id} ${course.name}`,
    })) || [];

  const semesterFilterOptions =
    semesters.data?.semesters?.map((semester) => ({
      value: semester.id,
      label: semester.name,
    })) || [];

  return (
    <Toolbar
      {...props}
      {...{
        courseFilterOptions,
        semesterFilterOptions,
        sortKeyOptions,
      }}
    />
  );
};

export default ToolbarContainer;
