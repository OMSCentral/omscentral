import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(2),
  },
  season: {
    marginRight: theme.spacing(1),
    '&:last-child': {
      margin: 0,
    },
  },
}));
