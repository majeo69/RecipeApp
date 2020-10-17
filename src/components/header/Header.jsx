import React from 'react';
import { Link } from 'react-router-dom';
import './Header.styles.scss';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { logoutCurrentUser } from '../../redux/user/user.actions';
import { selectUserToken } from '../../redux/user/user.selectors';


const mapDispatchToProps = dispatch => ({
  logoutCurrentUser: token => dispatch(logoutCurrentUser(token))
})

const mapStateToProps = createStructuredSelector({
  currentUserToken: selectUserToken
});

const Header = ({ logoutCurrentUser, currentUserToken }) => {
  const handleClick = event => {
    if (currentUserToken) {
      logoutCurrentUser(currentUserToken)
    };
  }

  return (
    <div className='header-container'>
      <Link className='web-logo' to='/'><span>Secret Recipes</span></Link>
      <div className='header-options'>
        <Link className='header-option' to='/explore'>Explore</Link>
        {
          currentUserToken ? 
          <Link className='header-option' to='/myrecipes'>
            <span>My Recipes</span>
          </Link> 
          : null
        }
        <Link className='header-option header-signin' to='/signin'>
          <Button variant="header" type="button" onClick={() => handleClick()}>
          {
            currentUserToken ? <span>Sign Out</span> : <span>Sign In</span>
          }
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);