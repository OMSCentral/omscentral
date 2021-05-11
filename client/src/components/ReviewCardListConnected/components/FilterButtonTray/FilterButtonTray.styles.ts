import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
  },
}));
