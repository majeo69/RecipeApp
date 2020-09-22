import React from 'react';
import { Link } from 'react-router-dom';
import './Header.styles.css';

const Header = () => {
  return (
    <div className='header-container'>
      <Link className='web-logo' to='/'>Secret Recipes</Link>
      <div className='header-options'>
        <Link className='header-option' to='/explore'>Explore</Link>
        <Link className='header-option' to='/myrecipes'>My Recipes</Link>
        <Link className='header-option' to='/signin'>Sign in</Link>
      </div>
    </div>
  );
}


export default Header;