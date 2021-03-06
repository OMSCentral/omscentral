import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
  },
  ml: {
    marginLeft: theme.spacing(1),
  },
  mr: {
    marginRight: theme.spacing(1),
  },
  mx: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  bold: {
    fontWeight: 'bolder',
  },
}));
