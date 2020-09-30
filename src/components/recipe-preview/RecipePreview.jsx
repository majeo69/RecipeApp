import React from 'react';
import './RecipePreview.styles.scss';

const RecipePreview = ({ recipe }) => {
  const { title, preparation, cook_time, servings } = recipe;
  return (
    <div className='recipe-container'>
      <h4>{title}</h4>
      <h5>Preparation time: {preparation}</h5>
      <h5>Cook time: {cook_time}</h5>
      <h6>Servings: {servings}</h6>
    </div>
  );
}

export default RecipePreview;