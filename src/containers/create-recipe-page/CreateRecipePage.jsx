import React from 'react';
import './CreateRecipePage.styles.scss';
import { withRouter } from 'react-router-dom';

import RecipeForm from '../../components/recipe-form/RecipeForm';
import RecipePhotoUpload from '../../components/recipe-photo-upload/RecipePhotoUpload';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectNewRecipeInfo, selectCreateRecipeSuccess, selectUploadFoodimgSuccess } from '../../redux/create-recipe/create.recipe.selectors';

const mapStateToProps = createStructuredSelector({
  onEditNewRecipe: selectNewRecipeInfo,
  createSuccess: selectCreateRecipeSuccess,
  uploadFoodimgSuccess: selectUploadFoodimgSuccess
})

const CreateRecipePage = (props) => {
  const { createSuccess, uploadFoodimgSuccess } = props;
  return (
    <div className='create-recipe-page-container'>
      {
        createSuccess ?
        <div className='create-recipe-img-section'>
        {
          uploadFoodimgSuccess ?
            <RecipePhotoUpload 
              msg1={"You've successfully uploaded the photo"}
              msg2={"Go back to "}
              msg3={"and check it out!"}
              msg4={"Congrats!"}
              recipeName={`${props.onEditNewRecipe.title}`} />
            :
            <RecipePhotoUpload 
              msg1={"Upload an image"}
              msg2={"Or simply go back to  "}
              msg3={"and upload it next time!"}
              msg4={"You are almost done!"}
              recipeName={`${props.onEditNewRecipe.title}`} />
        }
        </div> 
        : 
        <RecipeForm />
      }
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(CreateRecipePage));