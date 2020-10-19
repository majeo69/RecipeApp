import React from 'react';
import './InitialUserPage.styles.scss';

const InitialUserPage = () => {
  return (
    <div className='initial-user-page-container'>
      <h5>You don't have any recipes yet. Create one today!</h5>
      <div className='initial-user-page-img'>
        <img alt='default_userimg' src={require('../../assets/initial-user-page.png')} />
      </div>
    </div>
  )
}

export default InitialUserPage;
