import React, { Component } from 'react';
import './UpdatePersonalInfo.styles.scss';

import Button from "@material-ui/core/Button";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { onEditProfile, updateUserInfo } from '../../redux/user/user.actions';
import { 
  selectUserName, 
  selectUserEmail,
  selectUserToken
} from '../../redux/user/user.selectors';

const mapStateToProps = createStructuredSelector({
  userName: selectUserName,
  userEmail: selectUserEmail,
  userToken: selectUserToken
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
    console.log(this.props.userToken)
    console.log(this.state.displayName)
    console.log(this.state.email)
    this.props.updateUserInfo(this.props.userToken, this.state.displayName, this.state.email);
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value })
  }

  render() {
    const { userName, userEmail } = this.props;
    return (
      <div className='personal-info-edit-container'>
        <form className='personal-info-edit' onSubmit={this.handleSubmit}>
          <input name="displayName" type="text" id="edit-name" onChange={this.handleChange} defaultValue={userName} />
          <input name="email" type="email" id="edit-email" onChange={this.handleChange} defaultValue={userEmail} />
          <Button variant="outlined" type="submit" size="small">Submit</Button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePersonalInfo);