import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';

export const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '100%',
    padding: theme.spacing(2),
  },
  avatar: {
    backgroundColor: red[500],
  },
  header: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  content: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  actions: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  ...[
    [1, green[900]],
    [2, green[400]],
    [3, orange[200]],
    [4, orange[600]],
    [5, red[700]],
  ].reduce(
    (css, [value, color]) => ({
      ...css,
      [`difficulty${value}`]: {
        color,
        borderColor: color,
      },
    }),
    {},
  ),
  ...[
    [5, green[900]],
    [4, green[400]],
    [3, orange[200]],
    [2, orange[600]],
    [1, red[700]],
  ].reduce(
    (css, [value, color]) => ({
      ...css,
      [`rating${value}`]: {
        color,
        borderColor: color,
      },
    }),
    {},
  ),
}));
