import React from 'react';
import './UpdateRecipePage.scss';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import RecipeForm from '../../components/recipe-form/RecipeForm';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUpdateRecipeSuccess, selectRecipeToBeUpdate } from '../../redux/update-recipe/update.recipe.selectors';
import { resetUpdateRecipe } from '../../redux/update-recipe/update.recipe.actions';


const mapStateToProps = createStructuredSelector({
  updateRecipeSuccess: selectUpdateRecipeSuccess,
  updatedRecipe: selectRecipeToBeUpdate
})

const mapDispatchToProps = (dispatch) => ({
  resetUpdateRecipe: () => dispatch(resetUpdateRecipe())
});

const UpdateRecipePage = (props) => {
  return (
    <div className='update-recipe-page-container'>
      {
        props.updateRecipeSuccess ?
        <div className='update-recipe-success-msg'>
          <h4>You've successfully updated your <span>{props.updatedRecipe.title}</span> recipe!</h4>
          <h5>Go back to 
            <Button 
              onClick={() => {
                props.history.push('/myrecipes');
                props.history.go();
                props.resetUpdateRecipe();}}
                variant="contained" color="primary" style={{marginLeft: "10px", marginRight: "10px"}}>My recipes
            </Button>
            and check it out!
          </h5>
          <div className='update-recipe-success-img'>
            <img alt='update-success-img' src={require('../../assets/update-success.png')} />
          </div>
        </div>
        : 
        <RecipeForm /> 
      }
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateRecipePage));