import React, { useContext, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import { Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Course, Semester, Specialization } from 'src/graphql';
import { FirebaseContext } from 'src/components/Firebase/Firebase';
import { NotificationContext } from 'src/components/Notification';
import { Nullable } from 'src/core';
import { paths } from 'src/constants';
import Loading from 'src/components/Loading';
import Paper from 'src/components/Paper';
import useLocal from 'src/core/utils/useLocalStorage';
import useSession from 'src/core/utils/useSessionStorage';
import useSpecializationCourses from 'src/core/hooks/useSpecializationCourses';
import Requirement from './components/Requirement';
import Table from './components/Table';
import Toolbar from './components/Toolbar';

interface Props {
  loading?: boolean;
  courses?: Course[];
  semesters?: Semester[];
  onSpecializationChange: (changeTo: Nullable<Specialization>) => void;
  specialization?: Specialization;
  specializations?: Specialization[];
}

const Courses: React.FC<Props> = ({
  loading,
  courses,
  semesters,
  onSpecializationChange,
  specialization,
  specializations,
}) => {
  const sm = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  const history = useHistory();
  const notification = useContext(NotificationContext)!;
  const firebase = useContext(FirebaseContext);
  const [filter, setFilter] = useSession('/c:f', '');
  const [size, setSize] = useLocal<'small' | 'medium'>('/c:s', 'medium');
  const [foundational, setFoundational] = useLocal('/c:fo', false);
  const [deprecated, setDeprecated] = useLocal('/c:d', false);
  const [hideUnreviewed, setHideUnreviewed] = useLocal('/c:hun', false);

  useEffect(() => {
    sm && setSize('small');
  }, [sm, setSize]);

  const bySpec = useSpecializationCourses(specializations);

  const filterBy: (course: Course) => boolean = useMemo(
    () => (course) =>
      (!specialization || bySpec.get(specialization.id)!.has(course.id)) &&
      (deprecated || !course.deprecated) &&
      (!hideUnreviewed || !!course.metric?.reviews.count) &&
      (!foundational || course.foundational) &&
      (!filter ||
        [course.id, course.department, course.name, ...course.aliases]
          .join(' ')
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())),
    [hideUnreviewed, deprecated, foundational, filter, specialization, bySpec],
  );

  const filtered = useMemo(() => (courses || []).filter(filterBy), [
    courses,
    filterBy,
  ]);

  const handleCourseClick = (course: Course) => {
    if (course.metric?.reviews.count) {
      firebase.analytics.logEvent('select_content', {
        content_type: 'course',
        content_id: course.id,
      });
      history.push(paths.course(course.id));
    } else {
      notification.warning('There are no reviews for this course.');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!courses?.length) {
    return null;
  }

  return (
    <Container component="main" maxWidth="xl" data-cy="courses">
      <Paper>
        <Toolbar
          size={size}
          onSizeChange={setSize}
          specializations={specializations}
          specialization={specialization}
          onSpecializationChange={onSpecializationChange}
          foundational={foundational}
          onFoundationalChange={setFoundational}
          deprecated={deprecated}
          onDeprecatedChange={setDeprecated}
          hideUnreviewed={hideUnreviewed}
          onHideUnreviewedChange={setHideUnreviewed}
          filter={filter}
          onFilterChange={setFilter}
        />
        {specialization ? (
          specialization.requirements.map((requirement, i) => (
            <Table
              before={
                <Requirement index={i} requirement={requirement} size={size} />
              }
              courses={filtered.filter((course) =>
                requirement.courses.includes(course.id),
              )}
              semesters={semesters || []}
              key={i}
              onClick={handleCourseClick}
              size={size}
            />
          ))
        ) : (
          <Table
            courses={filtered}
            semesters={semesters || []}
            onClick={handleCourseClick}
            size={size}
          />
        )}
      </Paper>
    </Container>
  );
};

export default Courses;
