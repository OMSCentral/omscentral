import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DateRangeIcon from '@material-ui/icons/DateRange';
import React, { useEffect, useState } from 'react';
import Menu from 'src/components/Menu';
import useModalState from 'src/core/hooks/useModalState';
import {
  FilterCount,
  Option,
  ReviewQueryParam as FilterType,
  ReviewSortKey as SortKey,
} from 'src/core/types';

import AutocompleteFilter from '../AutocompleteFilter';
import FilterMenu from '../FilterMenu';
import FilterModal from '../FilterModal';
import { useStyles } from './Toolbar.styles';

export interface Props {
  courseFilter?: string[];
  courseFilterOptions: Option[];
  onCourseFilterChange: (filter: string[]) => void;
  semesterFilter?: string[];
  semesterFilterOptions: Option[];
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

  useEffect(() => {
    setFilterCounts({
      [FilterType.Course]: calculateFilterCount(
        courseFilter,
        courseFilterOptions,
      ),
    });
  }, [courseFilter, courseFilterOptions]);

  const {
    isShown: isSemesterFilterShown,
    onShow: showSemesterFilter,
    onHide: hideSemesterFilter,
  } = useModalState(false);

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

  const handleSemesterFilterChange = (options: Option[]) => {
    onSemesterFilterChange(options.map((option) => option.value));
    hideSemesterFilter();
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

      {semesterFilter != null && (
        <>
          <Typography variant="body2">Semesters:</Typography>
          <IconButton onClick={showSemesterFilter} className={classes.mx}>
            <DateRangeIcon fontSize="small" />
          </IconButton>
          {isSemesterFilterShown && (
            <FilterModal
              title="Semester Filter"
              options={semesterFilterOptions}
              initialValue={semesterFilter}
              onCancel={hideSemesterFilter}
              onOk={handleSemesterFilterChange}
            />
          )}
        </>
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
