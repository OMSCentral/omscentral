import Typography from '@material-ui/core/Typography';
import React from 'react';
import Grow from 'src/components/Grow';
import Menu from 'src/components/Menu';
import useModalState from 'src/core/hooks/useModalState';
import {
  FilterCount,
  Option,
  ReviewQueryParam as FilterType,
  ReviewSortKey as SortKey,
  SemesterOption,
} from 'src/core/types';

import AutocompleteFilter from '../AutocompleteFilter';
import FilterMenu from '../FilterMenu';
import SemesterFilter from '../SemesterFilter';
import { useStyles } from './Toolbar.styles';
import { calculateFilterCount } from './Toolbar.utils';

export interface Props {
  courseFilter?: string[];
  courseFilterOptions: Option[];
  onCourseFilterChange: (filter: string[]) => void;
  semesterFilter?: string[];
  semesterFilterOptions: SemesterOption[];
  onSemesterFilterChange: (filter: string[]) => void;
  sortKey?: SortKey;
  sortKeyOptions: Option<SortKey>[];
  onSortKeyChange: (key: SortKey) => void;
  message?: string;
}

const Toolbar: React.FC<Props> = ({
  courseFilter,
  courseFilterOptions,
  onCourseFilterChange,
  semesterFilter,
  semesterFilterOptions,
  onSemesterFilterChange,
  sortKey,
  sortKeyOptions,
  onSortKeyChange,
  message,
}) => {
  const classes = useStyles();

  const {
    isShown: isCourseFilterShown,
    onShow: showCourseFilter,
    onHide: hideCourseFilter,
  } = useModalState(false);

  const {
    isShown: isSemesterFilterShown,
    onShow: showSemesterFilter,
    onHide: hideSemesterFilter,
  } = useModalState(false);

  const filterCounts: Map<FilterType, FilterCount> = new Map([
    [
      FilterType.Course,
      calculateFilterCount(courseFilter, courseFilterOptions),
    ],
    [
      FilterType.Semester,
      calculateFilterCount(semesterFilter, semesterFilterOptions),
    ],
  ]);

  const handleCourseFilterChange = (options: Option[]) => {
    onCourseFilterChange(options.map((option) => option.value));
    hideCourseFilter();
  };

  const handleSemesterFilterChange = (semesterIds: string[]) => {
    onSemesterFilterChange(semesterIds);
    hideSemesterFilter();
  };

  return (
    <div className={classes.toolbar}>
      {message && <Typography variant="body2">{message}</Typography>}

      <Grow />

      {courseFilter != null && (
        <FilterMenu
          id="filter_by_course"
          filterName="Courses"
          filterCount={filterCounts.get(FilterType.Course)!}
          isMenuShown={isCourseFilterShown}
          showMenu={showCourseFilter}
          hideMenu={hideCourseFilter}
          content={
            <AutocompleteFilter
              label="Select Courses"
              options={courseFilterOptions}
              initialValue={courseFilter}
              onSubmit={handleCourseFilterChange}
            />
          }
        />
      )}

      {semesterFilter != null && (
        <FilterMenu
          id="filter_by_semester"
          filterName="Semesters"
          filterCount={filterCounts.get(FilterType.Semester)!}
          isMenuShown={isSemesterFilterShown}
          showMenu={showSemesterFilter}
          hideMenu={hideSemesterFilter}
          content={
            <SemesterFilter
              options={semesterFilterOptions}
              initialValue={semesterFilter}
              onSubmit={handleSemesterFilterChange}
            />
          }
        />
      )}

      {sortKey != null && (
        <>
          <Menu
            id="sort_by"
            buttonCaption={`Sort by: ${
              sortKeyOptions.find((option) => option.value === sortKey)!.label
            }`}
            items={sortKeyOptions.map(({ value, label }) => ({
              key: value,
              onClick: () => onSortKeyChange(value),
              caption: (
                <Typography
                  className={sortKey === value ? classes.bold : undefined}
                  data-cy={`sort_by:${value}`}
                >
                  {label}
                </Typography>
              ),
            }))}
          />
        </>
      )}
    </div>
  );
};

export default Toolbar;
