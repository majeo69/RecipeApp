import React from 'react';
import './EditRecipePhotoPage.styles.scss';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import RecipePhotoUpload from '../../components/recipe-photo-upload/RecipePhotoUpload';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectNewRecipeInfo, selectUploadFoodimgSuccess } from '../../redux/create-recipe/create.recipe.selectors';

const mapStateToProps = createStructuredSelector({
  onEditRecipeForPhoto: selectNewRecipeInfo,
  updateFoodimgSuccess: selectUploadFoodimgSuccess
})

const EditRecipePhotoPage = (props) => {
  return (
    <div className='edit-recipe-photo-page-container'>
      <div className='edit-recipe-photo-section'>
        {
          props.updateFoodimgSuccess ?
          <div>
            <h5>You've successfully uploaded the a new photo for your {props.onEditRecipeForPhoto.title} recipe!</h5>
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
          :
          <div>
            <h5>Want to upload a new photo for your {props.onEditRecipeForPhoto.title} recipe?</h5>
            <h5>Or simply go back to 
              <Button 
                onClick={() => {
                  props.history.push('/myrecipes');
                  props.history.go();}}
                variant="contained" color="default" style={{marginLeft: "10px", marginRight: "10px"}}>My recipes
              </Button>
              and update it next time!
            </h5>
          </div>
        }
        <RecipePhotoUpload />
      </div>
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(EditRecipePhotoPage));
