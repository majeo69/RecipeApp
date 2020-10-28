import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const StyledColorfulButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FFA497 30%, #FED259 90%)',
    borderRadius: 20,
    color: '#ffffff',
    height: "33px",
    width: "90px",
    fontSize: "15px"
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default StyledColorfulButton;