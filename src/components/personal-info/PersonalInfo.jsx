import React, { Component } from 'react';
import './PersonalInfo.styles.scss';

import { Button, IconButton, CircularProgress } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

import UpdatePersonalInfo from '../update-personal-info/UpdatePersonalInfo';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { 
  uploadProfileImage, 
  uploadProfileImageTypeError, 
  deleteProfileImage, 
  onEditProfile 
} from '../../redux/user/user.actions';
import { 
  selectUserName, 
  selectUserEmail,
  selectUserToken, 
  selectUserAvatar,
  selectUploadProfilePicPending,
  selectUploadProfilePicSuccess,
  selectUploadProfilePicError,
  selectEditStatus,
  selectDeleteProfilePicPending
} from '../../redux/user/user.selectors';

const mapStateToProps = createStructuredSelector({
  userName: selectUserName,
  userEmail: selectUserEmail,
  userAvatar: selectUserAvatar,
  userToken: selectUserToken,
  uploadProfilePicPending: selectUploadProfilePicPending,
  uploadProfilePicSuccess: selectUploadProfilePicSuccess,
  uploadProfilePicError: selectUploadProfilePicError,
  editStatus: selectEditStatus,
  deleteProfilePicPending: selectDeleteProfilePicPending
})

const mapDispatchToProps = (dispatch) => ({
  uploadProfileImage: (token, profilepic) => dispatch(uploadProfileImage(token, profilepic)),
  uploadProfileImageTypeError: data => dispatch(uploadProfileImageTypeError(data)),
  deleteProfileImage: token => dispatch(deleteProfileImage(token)),
  onEditProfile: () => dispatch(onEditProfile())
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

  onEdit = event => {
    if (!this.props.editStatus) {
      this.props.onEditProfile();
    }
  }

  render () {
    const { userName, userEmail, userAvatar, editStatus, uploadProfilePicPending, deleteProfilePicPending } = this.props;
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
              <Button color="default" size="small" component="span"
                disabled={uploadProfilePicPending} startIcon={<PhotoCamera />}>
                {uploadProfilePicPending && <CircularProgress size={15} />}
                {!uploadProfilePicPending && 'Upload'}
              </Button>
            </label>
          </div>
          <div className='deleteuserimg-container'>
            <Button color="default" size="small" onClick={this.onDelete} 
              disabled={deleteProfilePicPending} startIcon={<DeleteIcon />} >
              {deleteProfilePicPending && <CircularProgress size={15} />}
              {!deleteProfilePicPending && 'Delete'}
            </Button>
          </div>
        </div>
        <div className='user-detailed-info'>
          {
            editStatus ? <UpdatePersonalInfo /> :
            <div className='name-and-email'>
              <div className='name-edit-icon'>
                <h4>{userName}</h4>
                <IconButton aria-label="edit-personal-info" onClick={this.onEdit}>
                  <EditRoundedIcon fontSize="small" />
                </IconButton>
              </div>
              <h6>{userEmail}</h6>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);