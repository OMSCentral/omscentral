import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import Menu from 'src/components/Menu';
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
  const [filterCounts, setFilterCounts] = useState<Record<string, FilterCount>>(
    {},
  );
  const [courseFilterOpen, setCourseFilterOpen] = useState(false);
  const [semesterFilterOpen, setSemesterFilterOpen] = useState(false);

  useEffect(() => {
    setFilterCounts({
      [FilterType.Course]: calculateFilterCount(
        courseFilter,
        courseFilterOptions,
      ),
      [FilterType.Semester]: calculateFilterCount(
        semesterFilter,
        semesterFilterOptions,
      ),
    });
  }, [
    courseFilter,
    courseFilterOptions,
    semesterFilter,
    semesterFilterOptions,
  ]);

  const calculateFilterCount = (
    filters: string[] = [],
    filterOptions: Option[],
  ): FilterCount => {
    const filterCount: FilterCount = {
      selected: 0,
      total: filterOptions.length,
    };

    if (filters.length > 0) {
      filterOptions.forEach((option) => {
        if (filters.includes(option.value)) filterCount.selected++;
      });
    }

    return filterCount;
  };

  const handleCourseFilterChange = (options: Option[]) => {
    onCourseFilterChange(options.map((option) => option.value));
    setCourseFilterOpen(false);
  };

  const handleSemesterFilterChange = (semesterIds: string[]) => {
    onSemesterFilterChange(semesterIds);
    setSemesterFilterOpen(false);
  };

  return (
    <div className={classes.toolbar}>
      {message && <Typography variant="body2">{message}</Typography>}

      {courseFilter != null && (
        <FilterMenu
          id="filter_by_course"
          filterName="Courses"
          filterCount={filterCounts[FilterType.Course]}
          open={courseFilterOpen}
          updateOpen={setCourseFilterOpen}
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

      {semesterFilter && (
        <FilterMenu
          id="filter_by_semester"
          filterName="Semesters"
          filterCount={filterCounts[FilterType.Semester]}
          open={semesterFilterOpen}
          updateOpen={setSemesterFilterOpen}
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
              sortKeyOptions.find((option) => option.value === sortKey)?.label
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
