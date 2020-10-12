import React from 'react';
import './RecipePage.styles.scss';

import RecipeDetails from '../../components/recipe-details/RecipeDetails';
import PersonalInfo from '../../components/personal-info/PersonalInfo';

const RecipePage = (props) => {
  const recipe = props.location.state.detailedRecipe
  return (
    <div className='recipe-details-page-container'>
      <div className='details-box'>
        <RecipeDetails recipe={recipe} history={props.history}/>
      </div>
      <div className='personal-info-box'>
        <PersonalInfo />
      </div>
    </div>
  );
}

export default RecipePage;