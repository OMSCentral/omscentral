import React from 'react';
import ReviewCardListConnected from 'src/components/ReviewCardListConnected';
import { Course as CourseType } from 'src/graphql';

import Metrics from './components/Metrics';

interface Props {
  course: CourseType;
}

const Course: React.FC<Props> = ({ course }) => (
  <ReviewCardListConnected
    variables={{ course_ids: [course.id] }}
    before={<Metrics course={course} />}
    courseSemesters={course.metric?.semesters}
  />
);

export default Course;
