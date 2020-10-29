import React from "react";
import './RecipeSlider.styles.scss';
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUsersTotalCount, selectUsersPublicCount } from '../../redux/user-recipes/user.recipes.selectors';

const mapStateToProps = createStructuredSelector({
  usersTotalCount: selectUsersTotalCount,
  usersPublicCount: selectUsersPublicCount
});

const TotalSlider = withStyles({
  root: {
    color: "#2A356C",
    height: 8
  }
})(Slider);

const PublicSlider = withStyles({
  root: {
    color: "#F4AEA4",
    height: 8
  }
})(Slider);

const PrivateSlider = withStyles({
  root: {
    color: "#FBDD8A",
    height: 8
  }
})(Slider);

const RecipeSlider = ({ usersTotalCount, usersPublicCount }) => {
  return (
    <div className='count-slider-container'>
      <div className='count-slider-row'>
        <span style={{marginRight:'9px'}}>Recipes</span>
        <TotalSlider
          value={usersTotalCount}
          aria-labelledby="discrete-slider-always"
          step={10}
          max={40}
          marks
          valueLabelDisplay="on"
        />
        <span style={{marginLeft:'8px'}}>{usersTotalCount}</span>
      </div>
      <div className='count-slider-row'>
        <span style={{marginRight:'20px'}}>Public</span>
        <PublicSlider 
          value={usersPublicCount} 
          step={10}
          min={0} 
          max={20} 
          marks 
        />
        <span style={{marginLeft:'8px'}}>{usersPublicCount}</span>
      </div>
      <div className='count-slider-row'>
        <span style={{marginRight:'15px'}}>Private</span>
        <PrivateSlider 
          value={usersTotalCount - usersPublicCount}
          step={10} 
          min={0} 
          max={20} 
          marks 
        />
        <span style={{marginLeft:'8px'}}>{usersTotalCount - usersPublicCount}</span>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(RecipeSlider);