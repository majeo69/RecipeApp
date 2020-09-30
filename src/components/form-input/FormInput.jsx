import React from 'react'
import './FormInput.styles.scss';

const FormInput = ({ label, ...otherProps }) => (
  <div className="single-form-input">
    <input className="form-styles" {...otherProps} />
    <label>{label}</label>
  </div>
);

export default FormInput;