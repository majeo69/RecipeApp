import React from 'react';
import './SignIn.styles.scss';

import FormInput from '../form-input/FormInput';

const SignIn = () => {
  return (
    <div className='signin-container'>
      <FormInput 
        name="email" 
        type="email"
        autoComplete="on" 
        label="email"
        required 
      />
      <FormInput 
        name="password" 
        type="password"
        autoComplete="on" 
        label="password"
        required 
      />
    </div>
  );
}

export default SignIn;