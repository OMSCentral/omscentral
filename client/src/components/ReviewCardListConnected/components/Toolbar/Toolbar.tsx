import Typography from '@material-ui/core/Typography';
import React from 'react';
import Grow from 'src/components/Grow';
import Menu from 'src/components/Menu';
import { Option, ReviewSortKey as SortKey } from 'src/core';
import useBoolean from 'src/core/hooks/useBoolean';

import AutocompleteFilter from '../AutocompleteFilter';
import ReviewFilter from '../DifficultyFilter/DifficultyFilter';
import FilterPopover from '../FilterPopover';
import SemesterFilter from '../SemesterFilter';
import ToolbarButton from '../ToolbarButton';
import { useStyles } from './Toolbar.styles';

export interface Props {
  courseFilter?: string[];
  courseFilterOptions: Option[];
  onCourseFilterChange: (filter: string[]) => void;
  semesterFilter?: string[];
  semesterFilterOptions: Option[];
  onSemesterFilterChange: (filter: string[]) => void;
  reviewFilter?: string[];
  reviewFilterOptions: Option[];
  onReviewFilterChange: (filter: string[]) => void;
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
  reviewFilter,
  reviewFilterOptions,
  onReviewFilterChange,
  sortKey,
  sortKeyOptions,
  onSortKeyChange,
  message,
}) => {
  const classes = useStyles();

  const {
    value: isCourseFilterOpen,
    setTrue: showCourseFilter,
    setFalse: hideCourseFilter,
  } = useBoolean(false);

  const {
    value: isSemesterFilterOpen,
    setTrue: showSemesterFilter,
    setFalse: hideSemesterFilter,
  } = useBoolean(false);

  const {
    value: isReviewFilterOpen,
    setTrue: showReviewFilter,
    setFalse: hideReviewFilter,
  } = useBoolean(false);

  const handleCourseFilterSubmit = (courseIds: string[]) => {
    onCourseFilterChange(courseIds);
    hideCourseFilter();
  };

  const handleSemesterFilterSubmit = (semesterIds: string[]) => {
    onSemesterFilterChange(semesterIds);
    hideSemesterFilter();
  };

  const handleReviewFilterSubmit = (reviewIds: string[]) => {
    onReviewFilterChange(reviewIds);
    hideReviewFilter();
  };

  const sortKeyOption = sortKeyOptions.find(({ value }) => value === sortKey)!;

  return (
    <div className={classes.toolbar}>
      {!!message && <Typography variant="body2">{message}</Typography>}

      <Grow />

      {courseFilterOptions.length > 0 && courseFilter != null && (
        <FilterPopover
          id="filter_by_courses"
          name="Courses"
          total={courseFilterOptions.length}
          selected={courseFilter.length}
          open={isCourseFilterOpen}
          onOpen={showCourseFilter}
          onClose={hideCourseFilter}
        >
          <AutocompleteFilter
            label="Courses"
            options={courseFilterOptions}
            initialValues={courseFilter}
            onSubmit={handleCourseFilterSubmit}
          />
        </FilterPopover>
      )}

      {semesterFilterOptions.length > 0 && semesterFilter != null && (
        <FilterPopover
          id="filter_by_semesters"
          name="Semesters"
          total={semesterFilterOptions.length}
          selected={semesterFilter.length}
          open={isSemesterFilterOpen}
          onOpen={showSemesterFilter}
          onClose={hideSemesterFilter}
        >
          <SemesterFilter
            options={semesterFilterOptions}
            initialValues={semesterFilter}
            onSubmit={handleSemesterFilterSubmit}
          />
        </FilterPopover>
      )}

      {reviewFilterOptions.length > 0 && reviewFilter != null && (
        <FilterPopover
          id="filter_by_reviews"
          name="Reviews"
          total={reviewFilterOptions.length}
          selected={reviewFilter.length}
          open={isReviewFilterOpen}
          onOpen={showReviewFilter}
          onClose={hideReviewFilter}
        >
          <ReviewFilter
            options={reviewFilterOptions}
            initialValues={reviewFilter}
            onSubmit={handleReviewFilterSubmit}
          />
        </FilterPopover>
      )}

      <Menu
        id="sort_by"
        renderTrigger={({ open, onOpen }) => (
          <ToolbarButton
            id="sort_by_trigger"
            caption={`Sort by: ${sortKeyOption.label}`}
            open={open}
            onClick={onOpen}
          />
        )}
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
    </div>
  );
};

export default Toolbar;
