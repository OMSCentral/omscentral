import { Paper } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { SemesterOption } from 'src/core';

import { useStyles } from './SemesterFilter.styles';

interface Props {
  semesterFilterOptions: SemesterOption[];
  initialValue?: string[];
  onSubmit: (semester_ids: string[]) => void;
}

type SemesterYear = {
  year: string;
  semesters: SemesterOption[];
};

type SemesterFilterState = {
  checked: boolean;
  indeterminate: boolean;
  semesters: Record<string, boolean>;
};

const SemesterFilter: React.FC<Props> = ({
  semesterFilterOptions,
  initialValue,
  onSubmit,
}) => {
  const [semesterYears, setSemesterYears] = useState<SemesterYear[]>([]);
  const [semesterFilters, setSemesterFilters] = useState<
    Record<string, SemesterFilterState>
  >({});
  const classes = useStyles();

  useEffect(() => {
    const newSemesterYears: SemesterYear[] = [];
    let year = 0,
      index = 0;
    const orderedSemesterFilterOptions = semesterFilterOptions.sort((a, b) => {
      if (a.year < b.year) return 1;
      else if (a.year > b.year) return -1;
      else if (a.season > b.season) return 1;
      else return -1;
    });

    orderedSemesterFilterOptions.forEach((semester) => {
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

    setSemesterYears(newSemesterYears);
  }, [semesterFilterOptions]);

  useEffect(() => {
    setSemesterFilters(
      semesterYears.reduce((object, semesterYear) => {
        let yearFilterState: SemesterFilterState = {
          checked: false,
          indeterminate: false,
          semesters: {},
        };

        semesterYear.semesters.forEach((semester) => {
          yearFilterState.semesters[semester.value] =
            initialValue?.includes(semester.value) || false;
        });

        yearFilterState = determineYearState(yearFilterState);

        return { ...object, [semesterYear.year]: yearFilterState };
      }, {}),
    );
  }, [initialValue, semesterYears]);

  const determineYearState = (
    yearFilterState: SemesterFilterState,
  ): SemesterFilterState => {
    const semesterCount = Object.keys(yearFilterState.semesters).length;
    let checkedCount = 0;

    for (const id in yearFilterState.semesters) {
      if (yearFilterState.semesters[id]) checkedCount++;
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

  return (
    <>
      <Paper className={classes.scrollableContainer} elevation={0}>
        <FormGroup>
          {semesterYears.map((semesterYear) => (
            <>
              {
                <MenuItem key={semesterYear.year}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={semesterYear.year}
                        className={`${classes.filterCheckbox} ${classes.filterCheckboxMain}`}
                        disableRipple={true}
                        color="primary"
                        checked={
                          semesterFilters[semesterYear.year]?.checked || false
                        }
                        indeterminate={
                          semesterFilters[semesterYear.year]?.indeterminate ||
                          false
                        }
                      />
                    }
                    label={
                      <Typography className={classes.bold}>
                        {semesterYear.year}
                      </Typography>
                    }
                  />
                </MenuItem>
              }
              {semesterYear.semesters.map((semester) => (
                <MenuItem key={semester.value}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={semester.value}
                        name={semesterYear.year}
                        className={`${classes.filterCheckbox} ${classes.filterCheckboxSub}`}
                        disableRipple={true}
                        color="primary"
                        checked={
                          semesterFilters[semesterYear.year]?.semesters[
                            semester.value
                          ] || false
                        }
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
    </>
  );
};

export default SemesterFilter;
