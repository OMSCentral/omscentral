import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Hidden from '@material-ui/core/Hidden';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import Grow from 'src/components/Grow';
import { useStyles } from './Toolbar.styles';

export type TableSize = 'small' | 'medium';

interface Props {
  size: TableSize;
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
      <Hidden smDown>
        <FormControlLabel
          className={classes.switch}
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
            className={classes.switch}
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
            className={classes.switch}
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
            className={classes.switch}
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
      </Hidden>

      <Grow />

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
    </div>
  );
};

export default Toolbar;
