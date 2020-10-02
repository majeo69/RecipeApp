import React, { Component } from 'react';
import './SignUp.styles.scss';

import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.actions';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormInput from '../form-input/FormInput';


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

class SignUp extends Component {
  constructor () {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      signupErrorMsg: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      return this.setState({ signupErrorMsg: 'Confirm Password doesn\'t match' })
    } else {
      this.setState({ signupErrorMsg: '' })
    }

    const cors_anywhere = 'https://chieh-cors-anywhere.herokuapp.com/'
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.displayName,
        email: this.state.email,
        password: this.state.password
      })
    };
    fetch(cors_anywhere + 'https://chieh-recipe-manager.herokuapp.com/users', requestOptions)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          this.setState({ signupErrorMsg: 'Something went wrong...' })
        }
      })
      .then(data => {
        if (data !== undefined) {
          this.props.setCurrentUser(data);
          this.setState({ signupErrorMsg: '' });
        }
      })
      .catch(error => this.setState({ signupErrorMsg: error }))

  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value })
  }

  render () {
    return (
      <div className='signup-container'>
        <form className='sign-up-form' onSubmit={this.handleSubmit} >
          <FormInput
            type='text'
            name='displayName'
            autoComplete="on" 
            label='Display Name'
            handleChange={this.handleChange} 
            value={this.state.displayName} 
            required
          />
          <FormInput
            type='email'
            name='email'
            autoComplete="on" 
            label='Email'
            handleChange={this.handleChange} 
            value={this.state.email} 
            required
          />
          <FormInput
            type='password'
            name='password'
            autoComplete="on" 
            label='Password'
            handleChange={this.handleChange} 
            value={this.state.password} 
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            autoComplete="on" 
            label='Confirm Password'
            handleChange={this.handleChange} 
            value={this.state.confirmPassword} 
            required
          />
          <div className='signup-button-container'>
            <Button type="submit" variant="outline-secondary">Sign Up</Button>
          </div>
          {
          this.state.signupErrorMsg ? <h6>{this.state.signupErrorMsg}</h6> : <h6>Welcome to join us!</h6>
          }
        </form>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(SignUp);