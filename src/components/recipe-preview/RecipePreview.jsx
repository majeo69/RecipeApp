import React from 'react';
import { withRouter } from 'react-router-dom';
import './RecipePreview.styles.scss';

const RecipePreview = ({ recipe, match, history }) => {
  const { _id, title, preparation, cook_time, servings } = recipe;
  return (
    <div className='recipe-container' 
      onClick={() => history.push({
        pathname: `${match.url}/${_id}`,
        state: {
          detailedRecipe: recipe
        }
      })}
    >
      <div className='foodimg_container'>
        {
          recipe.img ? <img alt='foodimg' src={`data:image/png;base64,${recipe.img}`} /> 
          : <img alt='default_foodimg' src={require('./food_default.png')} />
        }
      </div>
      <h4>{title}</h4>
      <h5>Preparation time: {preparation}</h5>
      <h5>Cook time: {cook_time}</h5>
      <h6>Servings: {servings}</h6>
    </div>
  );
}

export default withRouter(RecipePreview);