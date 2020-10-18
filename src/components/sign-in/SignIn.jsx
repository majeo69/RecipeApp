import React, { Component } from 'react';
import './SignIn.styles.scss';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import FormInput from '../form-input/FormInput';

import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.actions';

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

class SignIn extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      errormsg: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const cors_anywhere = 'https://chieh-cors-anywhere.herokuapp.com/'
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    };

    fetch(cors_anywhere + 'https://chieh-recipe-manager.herokuapp.com/users/login', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          this.setState({ errormsg: "Your login information is wrong, please try it again!" });
        }
      })
      .then(data => {
        if (data !== undefined) {
          this.setState({ errormsg: '' });
          this.props.setCurrentUser(data);
        }
      })
      .catch(error => this.setState({ errormsg: error }))
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value })
  }

  render() {
    return (
      <div className='signin-container'>
        <form className='sign-in-form' onSubmit={this.handleSubmit}>
          <h6>Sign in with your email and password.</h6>
          <FormInput 
            name="email" 
            type="email"
            autoComplete="on" 
            label="email"
            handleChange={this.handleChange} 
            value={this.state.email} 
            required 
          />
          <FormInput 
            name="password" 
            type="password"
            autoComplete="on" 
            label="password"
            handleChange={this.handleChange} 
            value={this.state.password} 
            required 
          />
          <div className='signin-button-container'>
            <Button type="submit" variant="outline-secondary">Sign In</Button>
          </div>
          {
            this.state.errormsg ? <h6>{this.state.errormsg}</h6> : null
          }
        </form>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(SignIn);