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
import { createNewRecipe, resetCreateNeRecipeState } from '../../redux/create-recipe/create.recipe.actions';
import { selectUserToken } from '../../redux/user/user.selectors';
import { selectCreateRecipePending, selectCreateRecipeSuccess, selectCreateRecipeErrormsg } from '../../redux/create-recipe/create.recipe.selectors'

const mapDispatchToProps = (dispatch) => ({
  createNewRecipe: (userToken, title, prep_time, cook_time, servings, ingredients, steps, public_recipe) => 
    dispatch(createNewRecipe(userToken, title, prep_time, cook_time, servings, ingredients, steps, public_recipe)),
    resetCreateNeRecipeState: () => dispatch(resetCreateNeRecipeState())
});

const mapStateToProps = createStructuredSelector({
  userToken: selectUserToken,
  createRecipePending: selectCreateRecipePending,
  createSuccess: selectCreateRecipeSuccess,
  createError: selectCreateRecipeErrormsg
})

class RecipeForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: '',
      prep_time: '',
      cook_time: '',
      servings: '',
      ingredients: '',
      steps: '',
      public_recipe: false
    }
  }

  componentDidMount() {
    this.props.resetCreateNeRecipeState();
  }

  handleSubmit = event => {
    event.preventDefault();
    const { userToken } = this.props;
    const { title, prep_time, cook_time, servings, ingredients, steps, public_recipe } = this.state;
    this.props.createNewRecipe(userToken, title, prep_time, cook_time, servings, ingredients, steps, public_recipe)

  }

  handleChange = event => {
    const { value, checked, name } = event.target;
    if (name === 'prep_time' || name === 'cook_time' || name === 'servings') {
      this.setState({ [name]: parseInt(value)})
    } else if (name === 'public_recipe'){
      this.setState({ [name]: checked})
    } else {
      this.setState({ [name]: value })
    }
  }

  render () {
    const { createRecipePending, createError, createSuccess } = this.props;
    return (
      <div className='create-recipe-fields'>
        <Button onClick={() => this.props.history.goBack()}
          type="button" startIcon={<KeyboardBackspaceIcon />}>
            Go Back
        </Button>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            onChange={this.handleChange}
            className='recipe-title-field' id="recipe-title" name='title' fullWidth label="Recipe Title" required />
          <div className='public-switch-button'>
            <h6>Public: 
              <Switch onChange={this.handleChange} name="public_recipe" inputProps={{ 'aria-label': 'secondary checkbox' }}/>
              (Note: All members have access to public recipes.)
            </h6>
          </div>
          <div className='category-field'>
            <h6 style={{verticalAlign: "center"}}>Category:</h6>
            <FormControlLabel control={<Checkbox name="checkedDessert" />} label="Dessert" />
            <FormControlLabel control={<Checkbox name="checkedMeal" />} label="Meal" />
            <FormControlLabel control={<Checkbox name="checkedDrink" />} label="Drink" />
          </div>
          <div className='time-field'>
            <h6>Prep time: </h6>
            <TextField
              onChange={this.handleChange}  
              id="standard-number" label="Number" type="number" inputProps={{ min: "0"}} name='prep_time' style={{margin: "0px 30px"}} required/>
            <h6>minutes</h6>
          </div>
          <div className='time-field'>
            <h6>Cook time:</h6>
            <TextField
              onChange={this.handleChange} 
              id="standard-number" label="Number" type="number" inputProps={{ min: "0"}} name='cook_time' style={{margin: "0px 30px"}} required/> 
            <h6>minutes</h6>
          </div>
          <div className='time-field'>
            <h6>Number of Servings:</h6>
            <TextField 
              onChange={this.handleChange} 
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
              required
            />
          </div>
          <div className='create-recipe-submitbtn'>
            <Button variant="contained" type="submit" onClick={this.handleSubmit} disabled={createRecipePending}>
              {createRecipePending && <CircularProgress size={19} />}
              {!createRecipePending && 'Submit'}
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