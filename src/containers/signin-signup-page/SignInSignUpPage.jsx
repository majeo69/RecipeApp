import React from 'react';
import './SignInSignUpPage.styles.scss';

import SignIn from '../../components/sign-in/SignIn';
import SignUp from '../../components/sign-up/SignUp';

const SignInSignUpPage = () => {
  return (
    <div className='signin-signup-page-container'>
      <div className='signin-box'>
        <SignUp />
      </div>
    </div>
  );
}

export default SignInSignUpPage;