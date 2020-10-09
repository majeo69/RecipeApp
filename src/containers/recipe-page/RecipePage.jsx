import React from 'react';
import './RecipePage.styles.scss';

import RecipeDetails from '../../components/recipe-details/RecipeDetails';

const RecipePage = (props) => {
  const recipe = props.location.state.detailedRecipe
  return (
    <div className='recipe-details-page-container'>
      <RecipeDetails recipe={recipe} history={props.history}/>
    </div>
  );
}

export default RecipePage;