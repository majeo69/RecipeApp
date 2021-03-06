import React, { Component } from 'react';
import './RecipePhotoUpload.styles.scss';
import { withRouter } from 'react-router-dom';

import { Button, CircularProgress } from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { uploadRecipeImage, uploadRecipeImgError } from '../../redux/create-recipe/create.recipe.actions';
import { selectUploadFoodimgPending, selectNewRecipeInfo } from '../../redux/create-recipe/create.recipe.selectors';

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

        <div className='upload-recipeimg-msg'>
          <h5>{this.props.msg4}</h5>
          <h4>{this.props.msg1} <span>for your </span> <span>{this.props.recipeName} recipe</span> ?</h4>
          <h5>{this.props.msg2}
            <Button 
              onClick={() => {
                this.props.history.push('/myrecipes');
                this.props.history.go();}}
                size="large" style={{marginLeft: "5px", marginRight: "5px", textDecoration:"underline"}}
            >My recipes
            </Button>
            {this.props.msg3}
          </h5>
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
            <Button variant="contained" color="primary" component="span" 
              disabled={uploadFoodimgPending} startIcon={<CloudUploadIcon />}>
              {uploadFoodimgPending && <CircularProgress size={15} />}
              {!uploadFoodimgPending && 'UPLOAD'}
            </Button>
          </label>
          <div className='upload-skip-btn'>
            <Button onClick={() =>{
              this.props.history.push('/myrecipes');
              this.props.history.go();
            }}
            size="medium" color="primary">
                SKIP
            </Button>
          </div>
        </div>

        <div className='upload-recipeimg'>
        {
          onEditRecipeInfo.img ? <img alt='recipe_image' src={`data:image/png;base64,${onEditRecipeInfo.img}`} /> 
          : <img alt='default_foodimg' src={require('../../assets/foodimg_default_detail.png')} />
        }
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipePhotoUpload));