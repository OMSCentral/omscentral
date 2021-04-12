import { Paper } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { SemesterOption } from 'src/core';

import FilterButtonTray from '../FilterButtonTray';
import { useStyles } from './SemesterFilter.styles';

interface Props {
  options: SemesterOption[];
  initialValue?: string[];
  onSubmit: (semesterIds: string[]) => void;
}

type SemesterYear = {
  year: string;
  semesters: SemesterOption[];
};

type SemesterFilterState = {
  checked: boolean;
  indeterminate: boolean;
  semesters: Map<string, boolean>;
};

const SemesterFilter: React.FC<Props> = ({
  options,
  initialValue,
  onSubmit,
}) => {
  const classes = useStyles();

  const semesterYears = (() => {
    const newSemesterYears: SemesterYear[] = [];
    let year = 0,
      index = 0;

    const orderedOptions = options.sort((a, b) => {
      if (a.year < b.year) return 1;
      else if (a.year > b.year) return -1;
      else if (a.season > b.season) return 1;
      else return -1;
    });

    orderedOptions.forEach((semester) => {
      if (year !== semester.year) {
        year = semester.year;
        index =
          newSemesterYears.push({
            year: semester.year.toString(),
            semesters: [],
          }) - 1;
      }

      newSemesterYears[index].semesters.push(semester);
    });

    return newSemesterYears;
  })();

  const determineYearState = (
    yearFilterState: SemesterFilterState,
  ): SemesterFilterState => {
    const semesterCount = yearFilterState.semesters.size;
    let checkedCount = 0;

    for (const [, checked] of yearFilterState.semesters.entries()) {
      if (checked) checkedCount++;
    }

    if (semesterCount === checkedCount) {
      yearFilterState.checked = true;
      yearFilterState.indeterminate = false;
    } else if (checkedCount > 0) {
      yearFilterState.checked = false;
      yearFilterState.indeterminate = true;
    } else {
      yearFilterState.checked = false;
      yearFilterState.indeterminate = false;
    }

    return yearFilterState;
  };

  const determineSemesterState = (
    yearFilterState: SemesterFilterState,
  ): SemesterFilterState => {
    for (const [id] of yearFilterState.semesters.entries()) {
      yearFilterState.semesters.set(id, yearFilterState.checked);
    }

    return yearFilterState;
  };

  const [semesterFilters, setSemesterFilters] = useState<
    Map<string, SemesterFilterState>
  >(
    semesterYears.reduce((map, semesterYear) => {
      let yearFilterState: SemesterFilterState = {
        checked: false,
        indeterminate: false,
        semesters: new Map<string, boolean>(),
      };

      semesterYear.semesters.forEach((semester) => {
        yearFilterState.semesters.set(
          semester.value,
          initialValue?.includes(semester.value) || false,
        );
      });

      yearFilterState = determineYearState(yearFilterState);

      return map.set(semesterYear.year, yearFilterState);
    }, new Map<string, SemesterFilterState>()),
  );

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = new Map(semesterFilters);
    newState.get(event.target.id)!.indeterminate = false;
    newState.get(event.target.id)!.checked = event.target.checked;
    newState.set(
      event.target.id,
      determineSemesterState(newState.get(event.target.id)!),
    );
    setSemesterFilters(newState);
  };

  const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = new Map(semesterFilters);
    newState
      .get(event.target.name)!
      .semesters.set(event.target.id, event.target.checked);
    newState.set(
      event.target.name,
      determineYearState(newState.get(event.target.name)!),
    );
    setSemesterFilters(newState);
  };

  const clearSelections = () => {
    const newState = new Map(semesterFilters);
    newState.forEach((_, year) => {
      newState.get(year)!.checked = false;
      newState.get(year)!.indeterminate = false;

      for (const [semesterId] of newState.get(year)!.semesters.entries()) {
        newState.get(year)!.semesters.set(semesterId, false);
      }
    });

    setSemesterFilters(newState);
  };

  const handleApply = () => {
    const stateCopy = new Map(semesterFilters);
    const selectedSemesterIds: string[] = [];
    stateCopy.forEach((semesterYear) => {
      for (const [semesterId] of semesterYear.semesters.entries()) {
        if (semesterYear.semesters.get(semesterId)) {
          selectedSemesterIds.push(semesterId);
        }
      }
    });

    onSubmit(selectedSemesterIds);
  };

  return (
    <>
      <Paper className={classes.scrollableContainer} elevation={0}>
        <FormGroup>
          {semesterYears.map((semesterYear) => (
            <>
              <MenuItem key={semesterYear.year}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id={semesterYear.year}
                      className={`${classes.filterCheckbox} ${classes.filterCheckboxMain}`}
                      disableRipple={true}
                      color="primary"
                      checked={
                        semesterFilters.get(semesterYear.year)?.checked || false
                      }
                      indeterminate={
                        semesterFilters.get(semesterYear.year)?.indeterminate ||
                        false
                      }
                      onChange={handleYearChange}
                    />
                  }
                  label={
                    <Typography className={classes.bold}>
                      {semesterYear.year}
                    </Typography>
                  }
                />
              </MenuItem>
              {semesterYear.semesters.map((semester) => (
                <MenuItem key={semester.value}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={semester.value}
                        name={semesterYear.year}
                        className={clsx(
                          classes.filterCheckbox,
                          classes.filterCheckboxSub,
                        )}
                        disableRipple={true}
                        color="primary"
                        checked={
                          semesterFilters
                            .get(semesterYear.year)
                            ?.semesters.get(semester.value) || false
                        }
                        onChange={handleSemesterChange}
                      />
                    }
                    label={<Typography>{semester.label}</Typography>}
                  />
                </MenuItem>
              ))}
            </>
          ))}
        </FormGroup>
      </Paper>
      <Divider variant="fullWidth" />
      <FilterButtonTray
        fullWidth={true}
        onClear={clearSelections}
        onSubmit={handleApply}
      />
    </>
  );
};

export default SemesterFilter;
