import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  first: {
    margin: theme.spacing(0, 0, 1.5, 1.5),
  },
  later: {
    margin: theme.spacing(3, 0, 1.5, 1.5),
  },
}));
