import React from 'react';
import { Option, ReviewSortKey as SortKey } from 'src/core/types';
import { useCoursesQuery, useSemestersQuery } from 'src/graphql';

import Toolbar, { Props as ChildProps } from './Toolbar';
import { getSemesterFilterOptions } from './Toolbar.utils';

type Props = Omit<
  ChildProps & { courseSemesters?: string[] },
  'courseFilterOptions' | 'semesterFilterOptions' | 'sortKeyOptions'
>;

const sortKeyOptions = [
  { value: SortKey.Semester, label: 'Semester' },
  { value: SortKey.Created, label: 'Created' },
];

const ToolbarContainer: React.FC<Props> = (props) => {
  const [courses, semesters] = [useCoursesQuery(), useSemestersQuery()];

  const courseFilterOptions: Option[] =
    courses.data?.courses?.map((course) => ({
      value: course.id,
      label: `${course.id} ${course.name}`,
    })) || [];

  const semesterFilterOptions = getSemesterFilterOptions(
    semesters.data,
    props.courseSemesters,
  );

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
