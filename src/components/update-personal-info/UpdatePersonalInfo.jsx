import React, { Component } from 'react';
import './UpdatePersonalInfo.styles.scss';

import { Button, CircularProgress} from "@material-ui/core";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { onEditProfile, updateUserInfo } from '../../redux/user/user.actions';
import { 
  selectUserName, 
  selectUserEmail,
  selectUserToken,
  selectEditProfilePending
} from '../../redux/user/user.selectors';

const mapStateToProps = createStructuredSelector({
  userName: selectUserName,
  userEmail: selectUserEmail,
  userToken: selectUserToken,
  editProfilePenging: selectEditProfilePending
})

const mapDispatchToProps = (dispatch) => ({
  onEditProfile: () => dispatch(onEditProfile()),
  updateUserInfo: (token, displayName, email) => dispatch(updateUserInfo(token, displayName, email))
});

class UpdatePersonalInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      displayName: props.userName,
      email: props.userEmail
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateUserInfo(this.props.userToken, this.state.displayName, this.state.email);
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value })
  }

  handleCancel = () => {
    this.props.onEditProfile();
  }

  render() {
    const { userName, userEmail, editProfilePenging } = this.props;
    return (
      <div className='personal-info-edit-container'>
        <form className='personal-info-edit' onSubmit={this.handleSubmit}>
          <input name="displayName" type="text" id="edit-name" onChange={this.handleChange} defaultValue={userName} />
          <input name="email" type="email" id="edit-email" onChange={this.handleChange} defaultValue={userEmail} />
          <div className='personal-info-edit-buttons'>
            <Button variant="outlined" type="submit" size="small"
              disabled={editProfilePenging}>
              {editProfilePenging && <CircularProgress size={15} />}
              {!editProfilePenging && 'Submit'}
            </Button>
            <Button variant="outlined" type="button" size="small" onClick={this.handleCancel}>Cancle</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePersonalInfo);