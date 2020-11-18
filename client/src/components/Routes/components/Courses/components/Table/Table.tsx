import React, { useMemo, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import MaterialPaper from '@material-ui/core/Paper';
import UITable, { Size } from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Course, Semester } from 'src/graphql';
import compare from 'src/core/utils/compare';
import stableSort from 'src/core/utils/stableSort';
import HeadCell, { cells, CellKey, SortDirection } from '../HeadCell';
import SemesterHistory from '../SemesterHistory';
import Stats from '../Stats';
import { useStyles } from './Table.styles';

export interface Props {
  before?: React.ReactElement<any>;
  courses: Course[];
  semesters: Semester[];
  onClick: (course: Course) => void;
  size: Size;
}

const Table: React.FC<Props> = ({
  before,
  courses,
  semesters,
  onClick,
  size,
}) => {
  const classes = useStyles();

  const [orderBy, setOrderBy] = useState<CellKey>(CellKey.Id);
  const [order, setOrder] = useState<SortDirection>('asc');

  const handleHeadCellClick = (id: CellKey) => {
    const isDesc = orderBy === id && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(id);
  };

  const sortBy: (a: Course, b: Course) => number = useMemo(
    () =>
      order === 'desc'
        ? (a, b) => -comparator(a, b, orderBy)
        : (a, b) => +comparator(a, b, orderBy),
    [order, orderBy],
  );

  return (
    <Grid container>
      {before}
      <TableContainer component={MaterialPaper}>
        <UITable className={classes.table} size={size} aria-label="courses">
          <TableHead>
            <TableRow>
              {cells.map((key) => (
                <HeadCell
                  key={key}
                  id={key}
                  onClick={() => handleHeadCellClick(key)}
                  order={order}
                  orderBy={orderBy}
                />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.length === 0 && (
              <TableRow>
                <TableCell colSpan={cells.length}>No matches...</TableCell>
              </TableRow>
            )}
            {stableSort(courses, sortBy).map((course) => (
              <TableRow key={course.id} onClick={() => onClick(course)} hover>
                <TableCell>{`${course.department}-${course.number}`}</TableCell>
                <TableCell className={classes.name}>
                  {course.name}
                  &nbsp;
                  {course.foundational && <sup>f</sup>}
                  {course.deprecated && <sup>d</sup>}
                </TableCell>
                <TableCell align="center">
                  {course.metric?.reviews.count}
                </TableCell>
                <TableCell align="center">
                  <Stats {...course.metric?.reviews.difficulty} />
                </TableCell>
                <TableCell align="center">
                  <Stats {...course.metric?.reviews.workload} />
                </TableCell>
                <TableCell align="center">
                  <Stats {...course.metric?.reviews.rating} />
                </TableCell>
                <TableCell align="center">
                  <SemesterHistory
                    semesters={semesters}
                    history={course.metric?.semesters || []}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </UITable>
      </TableContainer>
    </Grid>
  );
};

export default Table;

const comparator = (a: Course, b: Course, orderBy: CellKey): number => {
  const aMetric = a.metric?.reviews;
  const bMetric = b.metric?.reviews;

  switch (orderBy) {
    case CellKey.Id:
      return compare(a.id, b.id);
    case CellKey.Name:
      return compare(a.name, b.name);
    case CellKey.Foundational:
      return compare(a.foundational, b.foundational);
    case CellKey.Deprecated:
      return compare(a.deprecated, b.deprecated);
    case CellKey.Reviews:
      return compare(aMetric?.count, bMetric?.count);
    case CellKey.Difficulty:
      return compare(aMetric?.difficulty.mean, bMetric?.difficulty.mean);
    case CellKey.Workload:
      return compare(aMetric?.workload.mean, bMetric?.workload.mean);
    case CellKey.Rating:
      return compare(aMetric?.rating.mean, bMetric?.rating.mean);
    case CellKey.Semesters:
    default:
      return 0;
  }
};
