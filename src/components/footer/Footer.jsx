import React from 'react';
import './Footer.styles.scss';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>© Copyright 2020. Created and Designed by{' '}
        <a target="_blank" rel="noopener noreferrer"
           href="https://stephanieportfolio-39f22.firebaseapp.com/#home">
             Stephanie Wang
        </a>{' '}
         and Fangyu Hsu.
      </p>
    </div>
  );
}

export default Footer;