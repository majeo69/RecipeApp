import React from 'react';
import { Link } from 'react-router-dom';
import './Header.styles.css';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setCurrentUser } from '../../redux/user/user.actions';
import { selectUserToken } from '../../redux/user/user.selectors';


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

const mapStateToProps = createStructuredSelector({
  currentUserToken: selectUserToken
});

const Header = ({ setCurrentUser, currentUserToken }) => {
  const handleClick = event => {
    if (currentUserToken) {
      setCurrentUser({})
    };
  }

  return (
    <div className='header-container'>
      <Link className='web-logo' to='/'>Secret Recipes</Link>
      <div className='header-options'>
        <Link className='header-option' to='/explore'>Explore</Link>
        <Link className='header-option' to='/myrecipes'>My Recipes</Link>
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