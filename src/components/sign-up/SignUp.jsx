import React from 'react';
import './SignUp.styles.scss';

import Button from '../../../node_modules/react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import FormInput from '../form-input/FormInput';

const SignUp = () => {
  return (
    <div className='signup-container'>
      <form className='sign-up-form'>
        <FormInput
          type='text'
          name='displayName'
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          autoComplete="on" 
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          autoComplete="on" 
          label='Confirm Password'
          required
        />
        <div className='signup-button-container'>
          <Button variant="outline-secondary">Sign Up</Button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;