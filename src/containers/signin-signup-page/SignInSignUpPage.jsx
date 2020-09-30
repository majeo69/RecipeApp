import React from 'react';
import './SignInSignUpPage.styles.scss';

import SignIn from '../../components/sign-in/SignIn';

const SignInSignUpPage = () => {
  return (
    <div className='signin-signup-page-container'>
      <div className='signin-box'>
        <SignIn />
      </div>
    </div>
  );
}

export default SignInSignUpPage;