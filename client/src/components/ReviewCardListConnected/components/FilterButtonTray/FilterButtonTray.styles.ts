import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));
