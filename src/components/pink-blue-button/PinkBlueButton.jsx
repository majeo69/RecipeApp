import React from 'react';
import './PinkBlueButton.styles.scss';

const PinkBlueButton = ({ btn_text, btn_type, SignInSignUp, submitRecipe, createRecipe }) => {
  return (
    <button
      type={btn_type} 
      className={`pink-blue-btn 
                  ${SignInSignUp ? 'signinsignup-btn': ''} 
                  ${submitRecipe ? 'submitrecipe-btn': ''}
                  ${createRecipe ? 'createrecipe-btn': ''}`}>
      <span className='pink-blue-text'>{btn_text}</span>
    </button>
  );
} 

export default PinkBlueButton;