import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(0, 0, 2, 0),
  },
  specializations: {
    minWidth: '100%',
  },
  switches: {
    height: '64px',
    paddingTop: '22px !important',
    textAlign: 'center',
    '& > label': {
      marginRight: theme.spacing(4),
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  filter: {
    minWidth: '100%',
  },
}));
