import React from 'react';
import { Helmet } from 'react-helmet';

import { Nullable } from 'src/core';
import {
  Specialization,
  useCoursesQuery,
  useSemestersQuery,
  useSpecializationsQuery,
} from 'src/graphql';
import useLocal from 'src/core/utils/useLocalStorage';
import Courses from './Courses';

const CoursesContainer: React.FC = () => {
  const [specializationId, setSpecializationId] = useLocal<Nullable<string>>(
    '/c:sid',
    null,
  );

  const courses = useCoursesQuery({ fetchPolicy: 'no-cache' });
  const semesters = useSemestersQuery();
  const specializations = useSpecializationsQuery();

  const handleSpecializationChange = (
    specialization: Nullable<Specialization>,
  ) => {
    setSpecializationId(specialization?.id || null);
  };

  const specialization = specializations.data?.specializations?.find(
    ({ id }) => id === specializationId,
  );

  return (
    <>
      <Helmet title="Courses">
        <meta
          name="description"
          content="Course reviews for Georgia Tech's OMSCS, OMSA, &amp; OMSCyber programs."
        />
      </Helmet>
      <Courses
        courses={courses.data?.courses}
        semesters={semesters.data?.semesters}
        specialization={specialization}
        onSpecializationChange={handleSpecializationChange}
        specializations={specializations.data?.specializations}
        loading={courses.loading || specializations.loading}
      />
    </>
  );
};

export default CoursesContainer;
