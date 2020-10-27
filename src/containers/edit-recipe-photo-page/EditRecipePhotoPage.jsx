import React from 'react';
import './EditRecipePhotoPage.styles.scss';
import { withRouter } from 'react-router-dom';

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
          <RecipePhotoUpload 
            msg1={"You've successfully uploaded the a new photo"}
            msg2={"Go back to "}
            msg3={"and check it out!"}
            msg4={"Congrats!"}
            recipeName={`${props.onEditRecipeForPhoto.title}`} />
          :
          <RecipePhotoUpload 
            msg1={"Want to upload a new photo"}
            msg2={"Or you can simply go back to "}
            msg3={"and update it next time!"}
            msg4={"You can change a photo for your recipe anytime!"}
            recipeName={`${props.onEditRecipeForPhoto.title}`} />
        }
      </div>
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(EditRecipePhotoPage));
