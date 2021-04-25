import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Nullable } from 'src/core';
import { Specialization } from 'src/graphql';

import SpecializationSelect from './components/SpecializationSelect';
import { useStyles } from './Toolbar.styles';

interface Props {
  specializations?: Specialization[];
  specialization?: Specialization;
  onSpecializationChange: (changeTo: Nullable<Specialization>) => void;
  filter: string;
  onFilterChange: (changeTo: string) => void;
}

const Toolbar: React.FC<Props> = ({
  specializations = [],
  specialization,
  onSpecializationChange,
  filter,
  onFilterChange,
}) => {
  const classes = useStyles();

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={3}>
          <SpecializationSelect
            className={classes.specializations}
            onChange={onSpecializationChange}
            options={specializations}
            value={specialization}
          />
        </Grid>
        <Hidden mdDown>
          <Grid item xs={12} lg={6} />
        </Hidden>
        <Grid item xs={12} sm={6} lg={3}>
          <TextField
            className={classes.filter}
            id="filter"
            name="filter"
            label="Filter Courses"
            placeholder="e.g. ML4T, 6501, Network..."
            size="small"
            autoComplete="filter"
            variant="filled"
            value={filter}
            onChange={handleFilterChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Toolbar;
