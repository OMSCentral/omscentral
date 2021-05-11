import Button from '@material-ui/core/Button';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React from 'react';

import { useStyles } from './ToolbarButton.styles';

interface Props {
  id: string;
  caption: string;
  open: boolean;
  onClick: (event: React.MouseEvent) => void;
}

const ToolbarButton: React.FC<Props> = ({ id, caption, open, onClick }) => {
  const classes = useStyles();

  return (
    <Button
      aria-label={id}
      aria-controls={id}
      aria-haspopup="true"
      onClick={onClick}
      className={classes.button}
      variant="outlined"
      size="medium"
      color="default"
      endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    >
      {caption}
    </Button>
  );
};

export default ToolbarButton;
