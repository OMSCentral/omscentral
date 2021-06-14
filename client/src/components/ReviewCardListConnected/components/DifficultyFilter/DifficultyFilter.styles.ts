import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: 400,
    overflow: 'auto',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  checkbox: {
    marginRight: theme.spacing(1),
    padding: 0,
  },
  checkboxMain: {
    marginLeft: theme.spacing(1),
  },
  checkboxSub: {
    marginLeft: theme.spacing(5),
  },
  bold: {
    fontWeight: 'bold',
  },
}));
