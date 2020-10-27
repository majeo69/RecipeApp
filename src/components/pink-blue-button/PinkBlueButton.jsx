import React from 'react';
import './PinkBlueButton.styles.scss';

const PinkBlueButton = ({ btn_text, SignInSignUp }) => {
  return (
    <button className={`pink-blue-btn ${SignInSignUp ? 'signinsignup-btn': null}`}>
      <span className='pink-blue-text'>{btn_text}</span>
    </button>
  );
} 

export default PinkBlueButton;