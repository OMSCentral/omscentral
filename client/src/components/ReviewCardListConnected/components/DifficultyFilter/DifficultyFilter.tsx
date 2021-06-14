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

import FilterButtonTray from '../FilterButtonTray/FilterButtonTray';
import { useStyles } from './DifficultyFilter.styles';

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

  const optionsByDifficulty = options.reduce<Map<string, Option[]>>(
    (groups, option) => {
      const difficulty = option.value;
      const options = groups.get(difficulty) || [];
      return groups.set(difficulty, options.concat(option));
    },
    new Map<string, Option[]>(),
  );

  const isDifficultyChecked = (difficulty: string): boolean => {
    const options = optionsByDifficulty.get(difficulty)!;
    return options.every(({ value }) => values.has(value));
  };

  const isDifficultyIndeterminate = (difficulty: string): boolean => {
    const options = optionsByDifficulty.get(difficulty)!;
    return (
      !isDifficultyChecked(difficulty) &&
      options.some(({ value }) => values.has(value))
    );
  };

  const toggleDifficulty = (difficulty: string, off = false) => {
    const difficultyOptions = optionsByDifficulty.get(difficulty)!;
    if (isDifficultyChecked(difficulty) || off) {
      setValues(
        difficultyOptions.reduce((values, option) => {
          values.delete(option.value);
          return values;
        }, new Set(values)),
      );
    } else {
      setValues(
        difficultyOptions.reduce(
          (values, option) => values.add(option.value),
          new Set(values),
        ),
      );
    }
  };

  const handleDifficultyClick = (event: React.MouseEvent<HTMLElement>) => {
    const difficulty = event.currentTarget.dataset['id'];
    if (difficulty != null) {
      toggleDifficulty(String(difficulty));
    }
  };

  const handleDifficultyCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const difficulty = String(event.currentTarget.id);
    toggleDifficulty(difficulty, !event.currentTarget.checked);
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
          {[...optionsByDifficulty].map(([difficulty]) => (
            <List key={difficulty} dense disablePadding>
              <ListItem
                data-id={difficulty}
                dense
                button
                onClick={handleDifficultyClick}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      id={`${difficulty}`}
                      className={clsx(classes.checkbox, classes.checkboxMain)}
                      disableRipple
                      color="primary"
                      checked={isDifficultyChecked(difficulty)}
                      indeterminate={isDifficultyIndeterminate(difficulty)}
                      onChange={handleDifficultyCheckboxChange}
                    />
                  }
                  label={
                    <Typography className={classes.bold}>
                      {difficulty}
                    </Typography>
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
