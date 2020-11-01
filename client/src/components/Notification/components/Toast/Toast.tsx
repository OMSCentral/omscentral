import React from 'react';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import Alert, { Color } from '@material-ui/lab/Alert';

export type Variant = Color;

export interface Props {
  message: string;
  variant: Variant;
  onClose: () => void;
}

const Toast: React.FC<Props> = ({ message, variant, onClose }) => {
  const handleClose: SnackbarProps['onClose'] = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        elevation={6}
        onClose={onClose}
        severity={variant}
        variant="filled"
      >
        <span data-cy="toast">{message}</span>
      </Alert>
    </Snackbar>
  );
};

export default Toast;
