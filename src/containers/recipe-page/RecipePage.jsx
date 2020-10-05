import React from 'react';
import './RecipePage.styles.scss';

const RecipePage = (props) => {
  const recipe = props.location.state.detailedRecipe
  return (
    <div>
      <h1>{recipe.title}</h1>
      <h3>Steps: </h3>
      {
        recipe.steps.map((step, index) => {
          return <h4 key={index} >{step}</h4>
        })
      }
      <button type="button" onClick={() => props.history.goBack()}></button>
    </div>
  );
}

export default RecipePage;