import React from 'react';
import './RecipeDetails.scss';

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const RecipeDetails = ({ recipe, history }) => {
  const { title, preparation, cook_time, servings, ingredients, steps } = recipe;
  return (
    <div className='recipe-details'>
      <Button variant="outlined" type="button" size="small" onClick={() => history.goBack()}>Go Back</Button>
      <h1>{title}</h1>
      <div className='recipe-details-img-container'>
        {
          recipe.img ? <img alt='foodimg' src={`data:image/png;base64,${recipe.img}`} /> 
          : <img className='food-img-default' alt='default_foodimg' src={require('../../utils/foodimg_default_detail.png')} />
        }
      </div>
      <div className='other-info'>
        <h5>Preparation: {preparation}</h5>
        <h5>Cook time: {cook_time}</h5>
        <h5>Servings: {servings}</h5>
      </div>
      <div className='recipe-details-ingredients-container'>
        <h3>Ingredients:</h3>
        <div className='recipe-details-ingredient'>
        {
          ingredients.map((ingredient, index) => {
            return <FormControlLabel
                      key={index}
                      value="end"
                      control={<Checkbox color="default" />}
                      label={<span style={{ fontSize: '1.3vw' }}>{ingredient}</span>}
                      labelPlacement="end"
                      fontSize={15}
                    />
          })
        }
        </div>
      </div>
      <div className='recipe-details-steps-container'>
        <h3>Steps: </h3>
        <div className='recipe-details-steps'>
        {
          steps.map((step, index) => {
            return (
              <div key={index} className='steps-styles'>
                <h5>Step {index+1}:</h5>
                <span>{step}</span><br />
              </div>)
          })
        }
        </div>
      </div >
      <Button variant="outlined" type="button" size="small" onClick={() => history.goBack()}>Go Back</Button>
    </div>
  );
}

export default RecipeDetails;