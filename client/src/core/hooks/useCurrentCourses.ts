import { useMemo } from 'react';
import { useParams } from 'react-router';
import { Course, useCoursesQuery } from 'src/graphql';

import { QueryParam } from '../types';
import useQueryParams from './useQueryParams';

/**
 * @returns Courses encoded in the current location.
 */
const useCurrentCourses = (): Course[] => {
  const { id: courseID } = useParams<{ id: string }>();
  const { course: courseIDs } = useQueryParams<{
    [QueryParam.Course]: string[];
  }>();

  const ids = (courseIDs ?? []).concat(courseID);

  const { data } = useCoursesQuery();

  return useMemo(
    () => (data?.courses ?? []).filter((course) => ids.includes(course.id)),
    [data?.courses, ids],
  );
};

export default useCurrentCourses;
