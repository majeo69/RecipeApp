import React, { Component } from 'react';
import './RecipePhotoUpload.styles.scss';

import { Button, CircularProgress } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { uploadRecipeImage, uploadRecipeImgError } from '../../redux/create-recipe/create.recipe.actions';
import { 
  selectCreatedRecipeId,
  selectUploadFoodimgPending, 
  selectUploadFoodimgSuccess, 
  selectUploadFoodimgErrormsg ,
  selectUploadedFoodimg
} from '../../redux/create-recipe/create.recipe.selectors';

const mapStateToProps = createStructuredSelector({
  recipeId: selectCreatedRecipeId,
  uploadFoodimgPending: selectUploadFoodimgPending,
  uploadFoodimgSuccess: selectUploadFoodimgSuccess,
  uploadFoodimgErrormsg: selectUploadFoodimgErrormsg,
  uploadedFoodimg: selectUploadedFoodimg
})

const mapDispatchToProps = (dispatch) => ({
  uploadRecipeImage: (recipeID, recipeImg) => dispatch(uploadRecipeImage(recipeID, recipeImg)),
  uploadRecipeImgError: () => dispatch(uploadRecipeImgError())
});


class RecipePhotoUpload extends Component {
  onChangeFile = event => {
    const imageFile = event.target.files[0];

    if (!imageFile) {
      this.props.uploadRecipeImgError('Please select an image.')
      return false;
    }
    if (!imageFile.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|HEIC)$/)) {
      this.props.uploadRecipeImgError('File type must be .jpg/jpeg, .png, .HEIC')
      return false;
    } else {
      this.props.uploadRecipeImage(this.props.recipeId, imageFile);
    }
  }

  render () {
    const { uploadFoodimgPending, uploadFoodimgSuccess, uploadedFoodimg } = this.props;
    return (
      <div className='upload-recipeimg-container'>
        <div className='upload-foodimg-btn-container'>
          <div className='uploadrecipeimg-container'>
            <input 
              accept="image/*" 
              className="upload-recipeimg-button" 
              id="upload-recipeimg"
              type="file" 
              style={{display:"none"}}
              onChange={this.onChangeFile}
            />
            <label htmlFor="upload-recipeimg">
              <Button variant="outlined" color="primary" size="small" component="span" 
                disabled={uploadFoodimgPending} startIcon={<PhotoCamera />}>
                {uploadFoodimgPending && <CircularProgress size={15} />}
                {!uploadFoodimgPending && 'Upload'}
              </Button>
            </label>
          </div>
        </div>

        <div className='upload-recipeimg'>
        {
          uploadFoodimgSuccess ? <img alt='recipe_image' src={`data:image/png;base64,${uploadedFoodimg}`} /> 
          : <img alt='default_foodimg' src={require('../../utils/foodimg_default_detail.png')} />
        }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePhotoUpload);