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
import { useStyles } from './ReviewFilter.styles';

interface Props {
  options: Option[];
  initialValues: string[];
  onSubmit: (semesterIds: string[]) => void;
}

const ReviewFilter: React.FC<Props> = ({
  options,
  initialValues,
  onSubmit,
}) => {
  const classes = useStyles();

  const [values, setValues] = useState<Set<string>>(new Set(initialValues));

  const optionsByYear = options.reduce<Map<string, Option[]>>(
    (groups, option) => {
      const year = option.value;
      const options = groups.get(year) || [];
      return groups.set(year, options.concat(option));
    },
    new Map<string, Option[]>(),
  );

  const isYearChecked = (year: string): boolean => {
    const options = optionsByYear.get(year)!;
    return options.every(({ value }) => values.has(value));
  };

  const isYearIndeterminate = (year: string): boolean => {
    const options = optionsByYear.get(year)!;
    return (
      !isYearChecked(year) && options.some(({ value }) => values.has(value))
    );
  };

  const toggleYear = (year: string, off = false) => {
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
      toggleYear(String(year));
    }
  };

  const handleYearCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const year = String(event.currentTarget.id);
    toggleYear(year, !event.currentTarget.checked);
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
            </List>
          ))}
        </FormGroup>
      </Paper>

      <Divider variant="fullWidth" />

      <FilterButtonTray onClear={handleClear} onSubmit={handleSubmit} />
    </>
  );
};

export default ReviewFilter;
