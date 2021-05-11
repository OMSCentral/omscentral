import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import React from 'react';

import { useStyles } from './FilterButtonTray.styles';

interface Props {
  onClear: () => void;
  onSubmit: () => void;
}

const FilterButtonTray: React.FC<Props> = ({ onClear, onSubmit }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Button variant="contained" color="secondary" onClick={onClear}>
        Clear
      </Button>
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Apply
      </Button>
    </Container>
  );
};

export default FilterButtonTray;
