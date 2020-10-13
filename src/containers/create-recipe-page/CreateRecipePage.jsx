import React from 'react';
import './CreateRecipePage.styles.scss';
import { withRouter } from 'react-router-dom';

import { Button, TextField } from "@material-ui/core";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const CreateRecipePage = (props) => {
  return (
    <div className='create-recipe-page-container'>
      <div className='create-recipe-fields'>
        <Button onClick={() => props.history.goBack()}
          type="button" startIcon={<KeyboardBackspaceIcon />}>
            Go Back
        </Button>
        <form noValidate autoComplete="off">
          <TextField className='recipe-title-field' id="recipe-title" fullWidth label="Recipe Title" />
          <div className='category-field'>
            <h6 style={{verticalAlign: "center"}}>Category:</h6>
            <FormControlLabel control={<Checkbox name="checkedDessert" />} style={{}} label="Dessert" />
            <FormControlLabel control={<Checkbox name="checkedMeal" />} label="Meal" />
            <FormControlLabel control={<Checkbox name="checkedDrink" />} label="Drink" />
          </div>
          <div className='time-field'>
            <h6>Prep time: </h6>
            <TextField id="standard-number" label="Number" type="number" style={{margin: "0px 30px"}} />
            <h6>minutes</h6>
          </div>
          <div className='time-field'>
            <h6>Cook time:</h6>
            <TextField id="standard-number" label="Number" type="number" style={{margin: "0px 30px"}}/> 
            <h6>minutes</h6>
          </div>
          <div className='time-field'>
            <h6>Number of Servings:</h6>
            <TextField id="standard-number" label="Number" type="number" style={{margin: "0px 30px"}}/> 
            <h6>poeple</h6>
          </div>

          <div className='ingredients-steps-field'>
            <h6>Ingredients: </h6>
            <TextField
              id="outlined-multiline-static"
              label="Separate the ingredients with enter key"
              multiline
              fullWidth
              rows={8}
              placeholder="2 ripe avocados&#10;1/4 teaspoon of salt&#10;1/4 cup chopped onion"
              variant="outlined"
            />
          </div>
          <div className='ingredients-steps-field'>
            <h6>Steps: </h6>
            <TextField
              id="outlined-multiline-static"
              label="Separate your steps with enter key"
              multiline
              fullWidth
              rows={8}
              placeholder="Bring a large pot of lightly salted water to a boil.&#10;Preheat oven to 425 degrees F (220 degrees C).&#10;Bake for 15 to 20 minutes in the preheated oven."
              variant="outlined"
            />
          </div>
          <div className='create-recipe-submitbtn'>
            <Button variant="outlined" type="submit" size="large">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(CreateRecipePage);