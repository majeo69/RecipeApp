import React from 'react'
import './FormInput.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="single-form-input">
    <input className="form-styles" onChange={handleChange} {...otherProps} />
    <label>{label}</label>
  </div>
);

export default FormInput;