import { Paper } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Option } from 'src/core';

import FilterButtonTray from '../FilterButtonTray';
import { useStyles } from './SemesterFilter.styles';

interface Props {
  options: Option[];
  initialValues: string[];
  onSubmit: (semesterIds: string[]) => void;
}

const SemesterFilter: React.FC<Props> = ({
  options,
  initialValues,
  onSubmit,
}) => {
  const classes = useStyles();

  const [values, setValues] = useState<Set<string>>(new Set(initialValues));

  const optionsByYear = options.reduce<Map<number, Option[]>>(
    (groups, option) => {
      const year = parseInt(option.value);
      const options = groups.get(year) || [];
      return groups.set(year, options.concat(option));
    },
    new Map<number, Option[]>(),
  );

  const isYearChecked = (year: number): boolean => {
    const options = optionsByYear.get(year)!;
    return options.every(({ value }) => values.has(value));
  };

  const isYearIndeterminate = (year: number): boolean => {
    const options = optionsByYear.get(year)!;
    return (
      !isYearChecked(year) && options.some(({ value }) => values.has(value))
    );
  };

  const isSemesterChecked = (value: string): boolean => {
    return values.has(value);
  };

  const toggleYear = (year: number, off = false) => {
    const yearOptions = optionsByYear.get(year)!;
    if (isYearChecked(year) || off) {
      setValues(
        yearOptions.reduce((values, option) => {
          values.delete(option.value);
          return values;
        }, new Set(values)),
      );
    } else {
      setValues(
        yearOptions.reduce(
          (values, option) => values.add(option.value),
          new Set(values),
        ),
      );
    }
  };

  const handleYearClick = (event: React.MouseEvent<HTMLElement>) => {
    const year = event.currentTarget.dataset['id'];
    if (year != null) {
      toggleYear(Number(year));
    }
  };

  const handleYearCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const year = Number(event.currentTarget.id);
    toggleYear(year, !event.currentTarget.checked);
  };

  const toggleSemester = (value: string, off = false) => {
    if (values.has(value) || off) {
      const without = new Set(values);
      without.delete(value);
      setValues(without);
    } else {
      setValues(new Set(values).add(value));
    }
  };

  const handleSemesterClick = (event: React.MouseEvent<HTMLElement>) => {
    const value = event.currentTarget.dataset['id'];
    if (value != null) {
      toggleSemester(value);
    }
  };

  const handleSemesterCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.currentTarget.id;
    toggleSemester(value, !event.currentTarget.checked);
  };

  const handleClear = () => {
    setValues(new Set());
  };

  const handleSubmit = () => {
    onSubmit(Array.from(values));
  };

  return (
    <>
      <Paper className={classes.container} elevation={0}>
        <FormGroup>
          {[...optionsByYear].map(([year, options]) => (
            <List key={year} dense disablePadding>
              <ListItem data-id={year} dense button onClick={handleYearClick}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id={`${year}`}
                      className={clsx(classes.checkbox, classes.checkboxMain)}
                      disableRipple
                      color="primary"
                      checked={isYearChecked(year)}
                      indeterminate={isYearIndeterminate(year)}
                      onChange={handleYearCheckboxChange}
                    />
                  }
                  label={
                    <Typography className={classes.bold}>{year}</Typography>
                  }
                />
              </ListItem>
              <List dense disablePadding>
                {options.map((option) => (
                  <ListItem
                    key={option.value}
                    data-id={option.value}
                    dense
                    button
                    onClick={handleSemesterClick}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          id={option.value}
                          className={clsx(
                            classes.checkbox,
                            classes.checkboxSub,
                          )}
                          disableRipple
                          color="primary"
                          checked={isSemesterChecked(option.value)}
                          onChange={handleSemesterCheckboxChange}
                        />
                      }
                      label={<Typography>{option.label}</Typography>}
                    />
                  </ListItem>
                ))}
              </List>
            </List>
          ))}
        </FormGroup>
      </Paper>

      <Divider variant="fullWidth" />

      <FilterButtonTray onClear={handleClear} onSubmit={handleSubmit} />
    </>
  );
};

export default SemesterFilter;
