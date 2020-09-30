import React from 'react'
import './FormInput.styles.scss';


const FormInput = ({ label, ...otherProps }) => (
  <div className="question">
    <input type="text" required/>
    <label>First Name</label>
  </div>
);


export default FormInput;