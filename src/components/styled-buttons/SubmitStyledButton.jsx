import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const SubmitStyledButton = withStyles({
  root: {
    background: '#FBDD8A',
    borderRadius: 3,
    border: 0,
    color: 'black',
    height: 40,
    width: 80,
  },
})(Button);

export default SubmitStyledButton;
