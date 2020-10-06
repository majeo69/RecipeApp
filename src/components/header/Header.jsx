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
      <Link className='web-logo' to='/'>Secret Recipes</Link>
      <div className='header-options'>
        <Link className='header-option' to='/explore'>Explore</Link>
        <Link className='header-option' to='/signin'>
          <Button variant="dark" type="button" onClick={() => handleClick()}>
          {
            currentUserToken ? "Sign Out" : "Sign In"
          }
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);