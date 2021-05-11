import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& > * + *': {
        marginBottom: theme.spacing(1),
      },
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      '& > * + *': {
        marginLeft: theme.spacing(1),
      },
    },
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
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
