import React, { Component } from 'react';
import './SignIn.styles.scss';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

import FormInput from '../form-input/FormInput';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { singinUser } from '../../redux/user/user.actions';
import { selectSigninPending, selectSigninFailed } from '../../redux/user/user.selectors';

const mapStateToProps = createStructuredSelector({
  signinPending: selectSigninPending,
  signinErrormsg: selectSigninFailed
})

const mapDispatchToProps = dispatch => ({
  singinUser: (email, password) => dispatch(singinUser(email, password))
})

class SignIn extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.singinUser(this.state.email, this.state.password);
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value })
  }

  render() {
    return (
      <div className='signin-container'>
        {console.log(this.props.signinPending)}
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
            <Button type="submit" variant="outline-secondary" disabled={this.props.signinPending}>
              {this.props.signinPending && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
              Sign In
            </Button>
          </div>
          {
            this.props.signinErrormsg ? <h6>{this.props.signinErrormsg}</h6> : null
          }
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);