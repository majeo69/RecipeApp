import React from 'react';
import './UpdateRecipePage.scss';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import RecipeForm from '../../components/recipe-form/RecipeForm';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUpdateRecipeSuccess } from '../../redux/update-recipe/update.recipe.selectors';


const mapStateToProps = createStructuredSelector({
  updateRecipeSuccess: selectUpdateRecipeSuccess
})

const UpdateRecipePage = (props) => {
  return (
    <div className='update-recipe-page-container'>
      {
        props.updateRecipeSuccess ?
        <div>
              <h5>You've successfully updated your recipe!</h5>
              <h5>Go back to 
                <Button 
                  onClick={() => {
                    props.history.push('/myrecipes');
                    props.history.go();}}
                    variant="contained" color="default" style={{marginLeft: "10px", marginRight: "10px"}}>My recipes
                </Button>
                and check it out!
              </h5>
            </div>
        : <RecipeForm /> 
      }
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(UpdateRecipePage));