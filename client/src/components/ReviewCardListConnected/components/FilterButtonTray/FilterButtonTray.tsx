import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import React from 'react';

import { useStyles } from './FilterButtonTray.styles';

interface Props {
  fullWidth: boolean;
  onClear: () => void;
  onSubmit: () => void;
}

const FilterButtonTray: React.FC<Props> = ({
  fullWidth,
  onClear,
  onSubmit,
}) => {
  const classes = useStyles();

  return (
    <Container className={classes.buttonContainer}>
      <Button
        variant="contained"
        color="secondary"
        fullWidth={fullWidth}
        onClick={onClear}
      >
        Clear
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth={fullWidth}
        onClick={onSubmit}
      >
        Apply
      </Button>
    </Container>
  );
};

export default FilterButtonTray;
