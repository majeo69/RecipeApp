import React, { Component } from 'react';
import './PersonalInfo.styles.scss';

import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { uploadProfileImage, uploadProfileImageTypeError, deleteProfileImage } from '../../redux/user/user.actions';
import { 
  selectUserName, 
  selectUserEmail,
  selectUserToken, 
  selectUserAvatar,
  selectUploadProfilePicSuccess,
  selectUploadProfilePicError
} from '../../redux/user/user.selectors';

const mapStateToProps = createStructuredSelector({
  userName: selectUserName,
  userEmail: selectUserEmail,
  userAvatar: selectUserAvatar,
  userToken: selectUserToken,
  uploadProfilePicSuccess: selectUploadProfilePicSuccess,
  uploadProfilePicError: selectUploadProfilePicError
})

const mapDispatchToProps = (dispatch) => ({
  uploadProfileImage: (token, profilepic) => dispatch(uploadProfileImage(token, profilepic)),
  uploadProfileImageTypeError: data => dispatch(uploadProfileImageTypeError(data)),
  deleteProfileImage: token => dispatch(deleteProfileImage(token))
});

class PersonalInfo extends Component {
  onChangeFile = event => {
    const imageFile = event.target.files[0];

    if (!imageFile) {
      this.props.uploadProfileImageTypeError('Please select an image.')
      return false;
    }
    if (!imageFile.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|HEIC)$/)) {
      this.props.uploadProfileImageTypeError('File type must be .jpg/jpeg, .png, .HEIC')
      return false;
    } else {
      this.props.uploadProfileImage(this.props.userToken, imageFile);
    }
  }

  onDelete = event => {
    if (this.props.userAvatar) {
      this.props.deleteProfileImage(this.props.userToken);
    }
  }

  render () {
    const { userName, userEmail, userAvatar } = this.props;
    return (
      <div className='personal-info'>
        <div className='user-avatar-container'>
          {
            userAvatar ? <img alt='userimg' src={`data:image/png;base64,${userAvatar}`} /> 
            : <img alt='default_userimg' src={require('./user_default.png')} />
          }
        </div>
        <div className='avatar-button-container'>
          <div className='uploaduserimg-container'>
            <input 
              accept="image/*" 
              className="upload-avatar-button" 
              id="upload-avatar"
              type="file" 
              style={{display:"none"}}
              onChange={this.onChangeFile}
            />
            <label htmlFor="upload-avatar">
              <Button variant="outlined" color="primary" size="small" component="span" startIcon={<PhotoCamera />}>
                Upload
              </Button>
            </label>
          </div>
          <div className='deleteuserimg-container'>
            <Button variant="outlined" color="secondary" size="small" startIcon={<DeleteIcon />} onClick={this.onDelete} >Del photo</Button>
          </div>
        </div>
        <div className='user-detailed-info'>
          <h4>Hi! {userName}</h4>
          <h6>{userEmail}</h6>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);