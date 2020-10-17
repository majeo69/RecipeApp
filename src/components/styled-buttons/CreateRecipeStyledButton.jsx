import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const CreateRecipeStyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FFA497 30%, #FED259 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 20px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default CreateRecipeStyledButton;