import React from 'react';
import './PersonalInfo.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserName, selectUserEmail, selectUserAvatar } from '../../redux/user/user.selectors';

const mapStateToProps = createStructuredSelector({
  userName: selectUserName,
  userEmail: selectUserEmail,
  userAvatar: selectUserAvatar
})

const PersonalInfo = ({ userName, userEmail, userAvatar }) => {
  return (
    <div className='personal-info'>
      <div className='user-avatar-container'>
        {
          userAvatar ? <img alt='userimg' src={`data:image/png;base64,${userAvatar}`} /> 
          : <img alt='default_userimg' src={require('./user_default.png')} />
        }
      </div>
      <div className='user-detailed-info'>
        <h4>Hi! {userName}</h4>
        <h6>{userEmail}</h6>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(PersonalInfo);