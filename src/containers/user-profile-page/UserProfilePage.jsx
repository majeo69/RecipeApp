import React from 'react';
import './UserProfilePage.styles.scss';
import PersonalInfo from '../../components/personal-info/PersonalInfo';

const UserProfilePage = (props) => {
  return (
    <div className='user-profile-container'>
      <div className='small-screen-user-profile'>
        <PersonalInfo />
      </div>
    </div>
  );
}

export default UserProfilePage;