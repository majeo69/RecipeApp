import React from 'react';
import './CreateRecipePage.styles.scss';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import RecipeForm from '../../components/recipe-form/RecipeForm';
import RecipePhotoUpload from '../../components/recipe-photo-upload/RecipePhotoUpload';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCreateRecipeSuccess, selectUploadFoodimgSuccess } from '../../redux/create-recipe/create.recipe.selectors';

const mapStateToProps = createStructuredSelector({
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
            <div>
              <h5>You've successfully upload the image for your recipe!</h5>
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
              <h5>You are almost done! Upload an image for your recipe!</h5>
              <h5>Or simply go back to 
                <Button 
                  onClick={() => {
                    props.history.push('/myrecipes');
                    props.history.go();}}
                  variant="contained" color="default" style={{marginLeft: "10px", marginRight: "10px"}}>My recipes
                </Button>
                and upload it next time!
              </h5>
            </div>
          }
          <RecipePhotoUpload />
        </div> 
        : 
        <RecipeForm />
      }
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(CreateRecipePage));