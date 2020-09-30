import React from 'react';
import './SignIn.styles.scss';

import FormInput from '../form-input/FormInput';

const SignIn = () => {
  return (
    <div className='signin-container'>
      <FormInput />
      <FormInput />
      <FormInput />
      <FormInput />
    </div>
  );
}

export default SignIn;