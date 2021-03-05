import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  autocomplete: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      width: 275,
    },
    [theme.breakpoints.up('sm')]: {
      width: 500,
    },
  },
}));
