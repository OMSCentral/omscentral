import { makeStyles } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import brown from '@material-ui/core/colors/brown';
import green from '@material-ui/core/colors/green';

export const useStyles = makeStyles((theme) => ({
  fall: {
    color: theme.palette.getContrastText(brown[400]),
    backgroundColor: brown[400],
  },
  spring: {
    color: theme.palette.getContrastText(green[200]),
    backgroundColor: green[200],
  },
  summer: {
    color: theme.palette.getContrastText(amber[500]),
    backgroundColor: amber[500],
  },
  small: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
