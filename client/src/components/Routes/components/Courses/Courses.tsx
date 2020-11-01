import React, { useContext, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import { Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MaterialPaper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Course } from 'src/graphql';
import { FirebaseContext } from 'src/components/Firebase/Firebase';
import { NotificationContext } from 'src/components/Notification';
import { paths } from 'src/constants';
import compare from 'src/core/utils/compare';
import Loading from 'src/components/Loading';
import Paper from 'src/components/Paper';
import stableSort from 'src/core/utils/stableSort';
import useLocal from 'src/core/utils/useLocalStorage';
import useSession from 'src/core/utils/useSessionStorage';
import HeadCell, { SortKey, SortDirection, cells } from './components/HeadCell';
import Stats from './components/Stats';
import Toolbar from './components/Toolbar';
import { useStyles } from './Courses.styles';

const sort = (a: Course, b: Course, orderBy: SortKey): number => {
  const aMetric = a.metric?.reviews;
  const bMetric = b.metric?.reviews;
  switch (orderBy) {
    case SortKey.Id:
      return compare(a.id, b.id);
    case SortKey.Name:
      return compare(a.name, b.name);
    case SortKey.Foundational:
      return compare(a.foundational, b.foundational);
    case SortKey.Deprecated:
      return compare(a.deprecated, b.deprecated);
    case SortKey.Reviews:
      return compare(aMetric?.count, bMetric?.count);
    case SortKey.Difficulty:
      return compare(aMetric?.difficulty.mean, bMetric?.difficulty.mean);
    case SortKey.Workload:
      return compare(aMetric?.workload.mean, bMetric?.workload.mean);
    case SortKey.Rating:
      return compare(aMetric?.rating.mean, bMetric?.rating.mean);
    default:
      return 0;
  }
};

interface Props {
  courses?: Course[];
  loading?: boolean;
}

const Courses: React.FC<Props> = ({ courses, loading }) => {
  const classes = useStyles();
  const sm = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  const history = useHistory();
  const notification = useContext(NotificationContext)!;
  const firebase = useContext(FirebaseContext);
  const [orderBy, setOrderBy] = useSession<SortKey>('/c:ob', SortKey.Id);
  const [order, setOrder] = useSession<SortDirection>('/c:o', 'asc');
  const [filter, setFilter] = useSession('/c:f', '');
  const [size, setSize] = useLocal<'small' | 'medium'>('/c:s', 'medium');
  const [foundational, setFoundational] = useLocal('/c:fo', false);
  const [deprecated, setDeprecated] = useLocal('/c:d', false);
  const [hideUnreviewed, setHideUnreviewed] = useLocal('/c:hun', false);

  useEffect(() => {
    sm && setSize('small');
  }, [sm, setSize]);

  const handleHeadCellClick = (id: SortKey) => () => {
    const isDesc = orderBy === id && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(id);
  };

  const handleBodyRowClick = (c: Course) => () => {
    if (c.metric?.reviews.count) {
      firebase.analytics.logEvent('select_content', {
        content_type: 'course',
        content_id: c.id,
      });
      history.push(paths.course(c.id));
    } else {
      notification.warning('There are no reviews for this course.');
    }
  };

  const sortBy: (a: Course, b: Course) => number = useMemo(
    () =>
      order === 'desc'
        ? (a, b) => -sort(a, b, orderBy)
        : (a, b) => +sort(a, b, orderBy),
    [order, orderBy],
  );

  const filterBy: (course: Course) => boolean = useMemo(
    () => (course) =>
      (deprecated || !course.deprecated) &&
      (!hideUnreviewed || !!course.metric?.reviews.count) &&
      (!foundational || course.foundational) &&
      (!filter ||
        [course.id, course.department, course.name, ...course.aliases]
          .join(' ')
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())),
    [hideUnreviewed, deprecated, foundational, filter],
  );

  if (loading) {
    return <Loading />;
  }

  if (!courses?.length) {
    return null;
  }

  const filtered = courses.filter(filterBy);

  return (
    <Container component="main" maxWidth="xl" data-cy="courses">
      <Paper>
        <Toolbar
          size={size}
          onSizeChange={setSize}
          foundational={foundational}
          onFoundationalChange={setFoundational}
          deprecated={deprecated}
          onDeprecatedChange={setDeprecated}
          hideUnreviewed={hideUnreviewed}
          onHideUnreviewedChange={setHideUnreviewed}
          filter={filter}
          onFilterChange={setFilter}
        />
        <TableContainer component={MaterialPaper}>
          <Table className={classes.table} size={size} aria-label="courses">
            <TableHead>
              <TableRow>
                {cells.map((id) => (
                  <HeadCell
                    key={id}
                    id={id}
                    onClick={handleHeadCellClick(id)}
                    orderBy={orderBy}
                    order={order}
                  />
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={cells.length}>No matches...</TableCell>
                </TableRow>
              )}
              {stableSort<Course>(filtered, sortBy).map((c) => (
                <TableRow key={c.id} onClick={handleBodyRowClick(c)} hover>
                  <TableCell>{`${c.department}-${c.number}`}</TableCell>
                  <TableCell className={classes.name}>
                    {c.name}
                    &nbsp;
                    {c.foundational && <sup>f</sup>}
                    {c.deprecated && <sup>d</sup>}
                  </TableCell>
                  <TableCell align="center">
                    {c.metric?.reviews.count}
                  </TableCell>
                  <TableCell align="center">
                    <Stats {...c.metric?.reviews.difficulty} />
                  </TableCell>
                  <TableCell align="center">
                    <Stats {...c.metric?.reviews.workload} />
                  </TableCell>
                  <TableCell align="center">
                    <Stats {...c.metric?.reviews.rating} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Courses;
