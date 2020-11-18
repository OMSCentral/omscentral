import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import { Nullable } from 'src/core';
import { Specialization } from 'src/graphql';
import { useStyles } from './Toolbar.styles';
import SpecializationSelect from './components/SpecializationSelect';

export type TableSize = 'small' | 'medium';

interface Props {
  size: TableSize;
  specializations?: Specialization[];
  specialization?: Specialization;
  onSpecializationChange: (changeTo: Nullable<Specialization>) => void;
  onSizeChange: (changeTo: TableSize) => void;
  foundational: boolean;
  onFoundationalChange: (changeTo: boolean) => void;
  deprecated: boolean;
  onDeprecatedChange: (changeTo: boolean) => void;
  hideUnreviewed: boolean;
  onHideUnreviewedChange: (changeTo: boolean) => void;
  filter: string;
  onFilterChange: (changeTo: string) => void;
}

const Toolbar: React.FC<Props> = ({
  size,
  onSizeChange,
  specializations = [],
  specialization,
  onSpecializationChange,
  foundational,
  onFoundationalChange,
  deprecated,
  onDeprecatedChange,
  hideUnreviewed,
  onHideUnreviewedChange,
  filter,
  onFilterChange,
}) => {
  const classes = useStyles();

  const handleSizeChange = () => {
    onSizeChange(size === 'small' ? 'medium' : 'small');
  };

  const handleFoundationalChange = () => {
    onFoundationalChange(!foundational);
  };

  const handleDeprecatedChange = () => {
    onDeprecatedChange(!deprecated);
  };

  const handleHideUnreviewedChange = () => {
    onHideUnreviewedChange(!hideUnreviewed);
  };

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
          <Grid item xs={12} lg={6} className={classes.switches}>
            <FormControlLabel
              label="Dense"
              control={
                <Switch
                  checked={size === 'small'}
                  onChange={handleSizeChange}
                  size="small"
                />
              }
            />
            <Tooltip title="Show only foundational courses?">
              <FormControlLabel
                label="Foundational"
                control={
                  <Switch
                    checked={foundational}
                    onChange={handleFoundationalChange}
                    size="small"
                  />
                }
              />
            </Tooltip>
            <Tooltip title="Show deprecated courses?">
              <FormControlLabel
                label="Deprecated"
                control={
                  <Switch
                    checked={deprecated}
                    onChange={handleDeprecatedChange}
                    size="small"
                  />
                }
              />
            </Tooltip>
            <Tooltip title="Hide courses without reviews?">
              <FormControlLabel
                label="Hide Unreviewed"
                control={
                  <Switch
                    checked={hideUnreviewed}
                    onChange={handleHideUnreviewedChange}
                    size="small"
                  />
                }
              />
            </Tooltip>
          </Grid>
        </Hidden>

        <Grid item xs={12} sm={6} lg={3}>
          <TextField
            className={classes.filter}
            id="filter"
            name="filter"
            label="Filter Courses"
            size="small"
            autoComplete="filter"
            variant="filled"
            value={filter}
            onChange={handleFilterChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Toolbar;
