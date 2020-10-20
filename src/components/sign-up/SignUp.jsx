import React, { Component } from 'react';
import './SignUp.styles.scss';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import FormInput from '../form-input/FormInput';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { signupNewUser } from '../../redux/user/user.actions';
import { selectSignupPending, selectSignupErrormsg } from '../../redux/user/user.selectors'

const mapStateToProps = createStructuredSelector({
  signupPending: selectSignupPending,
  signupError: selectSignupErrormsg
})

const mapDispatchToProps = dispatch => ({
  signupNewUser: (displayName, email, password) => dispatch(signupNewUser(displayName, email, password))
})

class SignUp extends Component {
  constructor () {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      signupPwdNotMatch: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      return this.setState({ signupPwdNotMatch: 'Confirm Password doesn\'t match' })
    } else {
      this.setState({ signupPwdNotMatch: '' });
      this.props.signupNewUser(this.state.displayName, this.state.email, this.state.password)
    }
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value })
  }

  render () {
    const { signupError } = this.props;
    const { displayName, email, password, confirmPassword, signupPwdNotMatch } = this.state;
    return (
      <div className='signup-container'>
        <form className='sign-up-form' onSubmit={this.handleSubmit} >
          <FormInput
            type='text'
            name='displayName'
            autoComplete="on" 
            label='Display Name'
            handleChange={this.handleChange} 
            value={displayName} 
            required
          />
          <FormInput
            type='email'
            name='email'
            autoComplete="on" 
            label='Email'
            handleChange={this.handleChange} 
            value={email} 
            required
          />
          <FormInput
            type='password'
            name='password'
            autoComplete="on" 
            label='Password'
            handleChange={this.handleChange} 
            value={password} 
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            autoComplete="on" 
            label='Confirm Password'
            handleChange={this.handleChange} 
            value={confirmPassword} 
            required
          />
          <div className='signup-button-container'>
            <Button type="submit" variant="outline-secondary" disabled={this.props.signupPending}>
              {this.props.signupPending && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
              Sign Up
            </Button>
          </div>
          {
            signupPwdNotMatch ? <h6>{signupPwdNotMatch}</h6> 
              : signupError ? <h6>{signupError}</h6> : <h6>Welcome to join us!</h6>
          }
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);