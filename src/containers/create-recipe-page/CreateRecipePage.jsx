import React from 'react';
import './CreateRecipePage.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCreateRecipeSuccess } from '../../redux/create-recipe/create.recipe.selectors';

import RecipeForm from '../../components/recipe-form/RecipeForm';
import RecipePhotoUpload from '../../components/recipe-photo-upload/RecipePhotoUpload';

const mapStateToProps = createStructuredSelector({
  createSuccess: selectCreateRecipeSuccess
})

const CreateRecipePage = (props) => {
  const { createSuccess } = props;
  return (
    <div className='create-recipe-page-container'>
      {
         createSuccess ? <RecipePhotoUpload /> : <RecipeForm />
      }
    </div>
  );
}

export default connect(mapStateToProps)(CreateRecipePage);