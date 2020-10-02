import React from 'react';
import './RecipesOverview.scss';

import RecipePreview from '../recipe-preview/RecipePreview';

const RecipesOverview = ({ recipes }) => {
  return (
    <div className='recipes-overview-container'>
      {
        recipes && recipes.map(recipe => {
          return (
            <RecipePreview
              key={recipe._id}
              recipe={recipe}
            />
          )
        })
      }
    </div>
  );
}

export default RecipesOverview;