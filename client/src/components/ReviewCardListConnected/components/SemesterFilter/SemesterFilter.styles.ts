import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  scrollableContainer: {
    maxHeight: 400,
    overflow: 'auto',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  filterCheckbox: {
    padding: 0,
    marginRight: theme.spacing(1),
  },
  filterCheckboxMain: {
    marginLeft: theme.spacing(1),
  },
  filterCheckboxSub: {
    marginLeft: theme.spacing(5),
  },
  bold: {
    fontWeight: 'bold',
  },
}));
