import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const UploadDeleteStyledButton = withStyles({
  root: {
    background: '#E0E0E0',
    borderRadius: 3,
    border: 0,
    color: 'black',
    padding: '5px 8px',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default UploadDeleteStyledButton;