import Button from '@material-ui/core/Button';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import React from 'react';

import { useStyles } from './ToolbarButton.styles';

interface Props {
  id: string;
  caption: string;
  onClick: (event: React.MouseEvent) => void;
}

const ToolbarButton: React.FC<Props> = ({ id, caption, onClick }) => {
  const classes = useStyles();

  return (
    <Button
      aria-label={id}
      aria-controls={id}
      aria-haspopup="true"
      onClick={onClick}
      className={classes.toolbarButton}
      variant="outlined"
      size="medium"
      color="default"
      endIcon={<KeyboardArrowDownIcon />}
    >
      {caption}
    </Button>
  );
};

export default ToolbarButton;
