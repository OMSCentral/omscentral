import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  name: {
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('lg')]: {
      width: 400,
    },
  },
}));
