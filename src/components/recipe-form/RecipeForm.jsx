import React, { Component } from 'react';
import './RecipeForm.styles.scss'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom';

import { Button, CircularProgress, TextField } from "@material-ui/core";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateRecipe } from '../../redux/update-recipe/update.recipe.actions';
import { createNewRecipe, resetCreateNeRecipeState } from '../../redux/create-recipe/create.recipe.actions';
import { selectUserToken } from '../../redux/user/user.selectors';
import { selectCreateRecipePending, selectCreateRecipeSuccess, selectCreateRecipeErrormsg } from '../../redux/create-recipe/create.recipe.selectors';
import { selectRecipeToBeUpdate, selectUpdateRecipePending } from '../../redux/update-recipe/update.recipe.selectors';

const mapDispatchToProps = (dispatch) => ({
  createNewRecipe: (userToken, title, prep_time, cook_time, servings, ingredients, steps, public_recipe) => 
    dispatch(createNewRecipe(userToken, title, prep_time, cook_time, servings, ingredients, steps, public_recipe)),
  updateRecipe: (userToken, title, prep_time, cook_time, servings, ingredients, steps, public_recipe) => 
    dispatch(updateRecipe(userToken, title, prep_time, cook_time, servings, ingredients, steps, public_recipe)),
  resetCreateNeRecipeState: () => dispatch(resetCreateNeRecipeState())
});

const mapStateToProps = createStructuredSelector({
  userToken: selectUserToken,
  createRecipePending: selectCreateRecipePending,
  createSuccess: selectCreateRecipeSuccess,
  createError: selectCreateRecipeErrormsg,
  recipeToBeUpdate: selectRecipeToBeUpdate,
  updateRecipePending: selectUpdateRecipePending
})

class RecipeForm extends Component {
  constructor (props) {
    super(props);
    if (Object.keys(this.props.recipeToBeUpdate).length===0) {
      this.state = {
        title: '',
        prep_time: '',
        cook_time: '',
        servings: '',
        ingredients: '',
        steps: '',
        public_recipe: false
      }
    } else {
      this.state = {
        title: this.props.recipeToBeUpdate.title,
        prep_time: this.props.recipeToBeUpdate.preparation,
        cook_time: this.props.recipeToBeUpdate.cook_time,
        servings: this.props.recipeToBeUpdate.servings,
        ingredients: this.props.recipeToBeUpdate.ingredients.join('\n'),
        steps: this.props.recipeToBeUpdate.steps.join('\n'),
        public_recipe: this.props.recipeToBeUpdate.public
      }
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const { userToken, recipeToBeUpdate } = this.props;
    const { title, prep_time, cook_time, servings, ingredients, steps, public_recipe } = this.state;
    if (Object.keys(this.props.recipeToBeUpdate).length===0) {
      this.props.createNewRecipe(userToken, title, prep_time, cook_time, servings, ingredients, steps, public_recipe)
    } else {
      this.props.updateRecipe(recipeToBeUpdate._id, userToken, title, prep_time, cook_time, servings, ingredients, steps, public_recipe)
    }
  }

  handleChange = event => {
    const { value, checked, name } = event.target;
    if (name === 'prep_time' || name === 'cook_time' || name === 'servings') {
      this.setState({ [name]: parseInt(value) })
    } else if (name === 'public_recipe'){
      this.setState({ [name]: checked })
    } else {
      this.setState({ [name]: value })
    }
  }

  render () {
    const { createRecipePending, createError, createSuccess, recipeToBeUpdate, updateRecipePending } = this.props;
    return (
      <div className='create-recipe-fields'>
        <Button onClick={() => this.props.history.goBack()}
          type="button" startIcon={<KeyboardBackspaceIcon />}>
            Go Back
        </Button>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            onChange={this.handleChange} defaultValue={recipeToBeUpdate.title || ''}
            className='recipe-title-field' id="recipe-title" name='title' fullWidth label="Recipe Title" required />
          <div className='public-switch-button'>
            <h6>Public: 
              <Switch onChange={this.handleChange} defaultChecked={recipeToBeUpdate.public || false}
                name="public_recipe" inputProps={{ 'aria-label': 'secondary checkbox' }}/>
              (Note: All members have access to public recipes.)
            </h6>
          </div>
          <div className='category-field'>
            <h6 style={{verticalAlign: "center"}}>Category:</h6>
            <FormControlLabel control={<Checkbox name="checkedDessert" color="primary" />} label="Dessert" />
            <FormControlLabel control={<Checkbox name="checkedMeal" color="primary" />} label="Meal" />
            <FormControlLabel control={<Checkbox name="checkedDrink" color="primary" />} label="Drink" />
          </div>
          <div className='time-field'>
            <h6>Prep time: </h6>
            <TextField
              onChange={this.handleChange} defaultValue={recipeToBeUpdate.preparation || ''}
              id="standard-number" label="Number" type="number" inputProps={{ min: "0"}} name='prep_time' style={{margin: "0px 30px"}} required/>
            <h6>minutes</h6>
          </div>
          <div className='time-field'>
            <h6>Cook time:</h6>
            <TextField
              onChange={this.handleChange} defaultValue={recipeToBeUpdate.cook_time || ''}
              id="standard-number" label="Number" type="number" inputProps={{ min: "0"}} name='cook_time' style={{margin: "0px 30px"}} required/> 
            <h6>minutes</h6>
          </div>
          <div className='time-field'>
            <h6>Number of Servings:</h6>
            <TextField 
              onChange={this.handleChange} defaultValue={recipeToBeUpdate.servings || ''}
              id="standard-number" label="Number" type="number" inputProps={{ min: "0"}} name='servings' style={{margin: "0px 30px"}} required/> 
            <h6>poeple</h6>
          </div>
          
          <div className='ingredients-steps-field'>
            <h6>Ingredients: </h6>
            <TextField
              id="outlined-multiline-static"
              label="Separate the ingredients with enter key"
              name='ingredients'
              multiline
              fullWidth
              rows={8}
              placeholder="2 ripe avocados&#10;1/4 teaspoon of salt&#10;1/4 cup chopped onion"
              variant="outlined"
              onChange={this.handleChange}
              defaultValue={Object.keys(recipeToBeUpdate).length===0 ?  '' : recipeToBeUpdate.ingredients.join('\n')}
              required
            />
          </div>
          <div className='ingredients-steps-field'>
            <h6>Steps: </h6>
            <TextField
              id="outlined-multiline-static"
              label="Separate your steps with enter key"
              name='steps'
              multiline
              fullWidth
              rows={8}
              placeholder="Bring a large pot of lightly salted water to a boil.&#10;Preheat oven to 425 degrees F (220 degrees C).&#10;Bake for 15 to 20 minutes in the preheated oven."
              variant="outlined"
              onChange={this.handleChange}
              defaultValue={Object.keys(recipeToBeUpdate).length===0 ?  '' : recipeToBeUpdate.steps.join('\n')}
              required
            />
          </div>
          <div className='create-recipe-submitbtn'>
            <Button variant="contained" type="submit" onClick={this.handleSubmit} 
              disabled={Object.keys(recipeToBeUpdate).length===0 ? createRecipePending : updateRecipePending}>
              {Object.keys(recipeToBeUpdate).length===0 ? 
                createRecipePending && <CircularProgress size={19} />
                : updateRecipePending && <CircularProgress size={19} />}
              {Object.keys(recipeToBeUpdate).length===0 ? 
                !createRecipePending && 'Submit'
                : !updateRecipePending && 'Submit'}
            </Button>
          </div>
        </form>
        <div className='create-recipe-error'>
        {
          createError ? <span>{createError}</span> : 
          createSuccess ? <span>Your new recipe is successfully uploaded! Enjoy!</span> : null
        }
        </div>
      </div>
    );
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(RecipeForm);