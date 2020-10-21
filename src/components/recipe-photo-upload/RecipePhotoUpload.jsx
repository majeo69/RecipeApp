import React, { Component } from 'react';
import './RecipePhotoUpload.styles.scss';
import { withRouter } from 'react-router-dom';

import StyledGreyButton from '../styled-buttons/StyledGreyButton';

import { Button, CircularProgress } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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
        <div className='upload-recipeimg-skip'>
          <Button onClick={() =>{
            this.props.history.push('/myrecipes');
            this.props.history.go();
          }}
            type="button" endIcon={<ArrowForwardIcon />}>
              SKIP
          </Button>
        </div>
        <div className='upload-recipeimg-msg'>
          <h4>{this.props.msg1} <span>{this.props.recipeName} recipe</span> ?</h4>
          <h5>{this.props.msg2}
            <Button 
              onClick={() => {
                this.props.history.push('/myrecipes');
                this.props.history.go();}}
                variant="contained" color="primary" style={{marginLeft: "10px", marginRight: "10px"}}>My recipes
              </Button>
              {this.props.msg3}</h5>
        </div>
        <div className='upload-foodimg-btn-container'>
            <input 
              accept="image/*" 
              className="upload-recipeimg-button" 
              id="upload-recipeimg"
              type="file" 
              style={{display:"none"}}
              onChange={this.onChangeFile}
            />
            <label htmlFor="upload-recipeimg">
              <StyledGreyButton variant="outlined" color="primary" component="span" 
                disabled={uploadFoodimgPending} startIcon={<PhotoCamera />}>
                {uploadFoodimgPending && <CircularProgress size={15} />}
                {!uploadFoodimgPending && 'UPLOAD'}
              </StyledGreyButton>
            </label>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipePhotoUpload));