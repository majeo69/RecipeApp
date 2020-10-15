import React, { Component } from 'react';
import './RecipePhotoUpload.styles.scss';

import { Button, CircularProgress } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { uploadRecipeImage, uploadRecipeImgError } from '../../redux/create-recipe/create.recipe.actions';
import { 
  selectUploadFoodimgPending,
  selectNewRecipeInfo
} from '../../redux/create-recipe/create.recipe.selectors';

const mapStateToProps = createStructuredSelector({
  uploadFoodimgPending: selectUploadFoodimgPending,
  onEditRecipeInfo: selectNewRecipeInfo
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
      this.props.uploadRecipeImage(this.props.onEditRecipeInfo._id, imageFile);
    }
  }

  render () {
    const { uploadFoodimgPending, onEditRecipeInfo } = this.props;
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
          onEditRecipeInfo.img ? <img alt='recipe_image' src={`data:image/png;base64,${onEditRecipeInfo.img}`} /> 
          : <img alt='default_foodimg' src={require('../../utils/foodimg_default_detail.png')} />
        }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePhotoUpload);