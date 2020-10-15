import React from 'react';
import './RecipeDetails.scss';

import { Button, IconButton, Checkbox, FormControlLabel } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import AlarmIcon from '@material-ui/icons/Alarm';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import { Stepper, Step, StepLabel, StepContent, Typography } from "@material-ui/core";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserId } from '../../redux/user/user.selectors';
import { setToBeUpdatedRecipe, resetUpdateRecipe } from '../../redux/update-recipe/update.recipe.actions';

const mapStateToProps = createStructuredSelector({
  userId: selectUserId
})

const mapDispatchToProps = (dispatch) => ({
  setToBeUpdatedRecipe: (data) => dispatch(setToBeUpdatedRecipe(data)),
  resetUpdateRecipe: () => dispatch(resetUpdateRecipe())
});

const RecipeDetails = ({ recipe, history, userId, setToBeUpdatedRecipe, resetUpdateRecipe }) => {
  const { title, preparation, cook_time, servings, ingredients, steps, owner } = recipe;
  return (
    <div className='recipe-details'>

      <div className='recipe-details-row1'>
        <Button onClick={() => history.goBack()}
          type="button" startIcon={<KeyboardBackspaceIcon />}>
            Go Back
        </Button>
        <Button onClick={() => {
          resetUpdateRecipe();
          history.push('/createrecipe');}}
          variant="outlined" color="default" startIcon={<AddIcon />}>
            Create Recipe
        </Button>
      </div>

      <div className='recipe-details-row2'>
        <h1>{title}</h1>
        {
          userId === owner ? 
            <IconButton type="button" aria-label="edit-recipe" 
              onClick={() => {
                setToBeUpdatedRecipe(recipe);
                history.push('/updaterecipe');}}>
              <EditRoundedIcon />
            </IconButton> 
            : null
        }
      </div>
      
      <div className='recipe-details-row3'>
        <AlarmIcon /><span style={{paddingLeft: "5px"}}>{preparation} mins</span>
        <div style={{paddingLeft: "16px", fontSize: "13px"}}><span>Prep: </span><br /><span>{preparation} mins</span></div>
        <div style={{paddingLeft: "16px", fontSize: "13px"}}><span>Cook: </span><br /><span>{cook_time} mins</span></div>
        <PersonOutlineIcon style={{marginLeft: 16}} /><span style={{paddingLeft: "5px"}}>{servings} people</span>
      </div>

      <div className='recipe-details-img-container'>
      {
        recipe.img ? <img alt='foodimg' src={`data:image/png;base64,${recipe.img}`} /> 
        : <img className='food-img-default' alt='default_foodimg' src={require('../../utils/foodimg_default_detail.png')} />
      }
      </div>

      <div className='recipe-details-ingredients-container'>
        <h3>{`<Ingredients for='${servings} people'>`}</h3>
        <div className='recipe-details-ingredient'>
        {
          ingredients.map((ingredient, index) => {
            return <FormControlLabel
                      key={index}
                      value="end"
                      control={<Checkbox color="default" />}
                      label={<span style={{ fontSize: '18px' }}>{ingredient}</span>}
                      labelPlacement="end"
                      fontSize={15}
                    />
          })
        }
        </div>
      </div>
      <div className='recipe-details-steps-container'>
        <h3>{`<Steps time='${preparation} minutes'>`}</h3>
        <Stepper className='stepper' orientation="vertical">
          {steps.map((step, index) => (
            <Step className='step' key={index} active={true} >
              <StepLabel className='stepLabel'>{`  Step ${index+1}`}</StepLabel>
              <StepContent className='stepContent'>
                <Typography className='typography'>{step}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div >
      <Button variant="outlined" type="button" size="small" onClick={() => history.goBack()}>Go Back</Button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);