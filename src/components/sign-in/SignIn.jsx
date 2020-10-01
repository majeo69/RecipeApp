import React from 'react';
import './SignIn.styles.scss';

import Button from '../../../node_modules/react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import FormInput from '../form-input/FormInput';

const SignIn = () => {
  return (
    <div className='signin-container'>
      <form>
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
      </form>
      <div className='signin-button-container'>
          <Button variant="outline-secondary">Sign In</Button>
        </div>
    </div>
  );
}

export default SignIn;