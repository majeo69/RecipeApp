import React from 'react';
import { withRouter } from 'react-router-dom';
import './RecipePreview.styles.scss';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const RecipePreview = ({ recipe, match, history }) => {
  const { _id, title, preparation, cook_time, servings } = recipe;
  return (
    <div className='recipe-container' 
      onClick={() => history.push({
        pathname: `${match.url}/${_id}`,
        state: {
          detailedRecipe: recipe
        }
      })}
    >
      <div className='foodimg_container'>
      {
        recipe.img ? <img alt='foodimg' src={`data:image/png;base64,${recipe.img}`} /> 
        : <img alt='default_foodimg' src={require('../../utils/food_default.png')} />
      }
      </div>
      <h4>{title}</h4>
      <div className='recipe-preview-icons'>
        <div className='recipe-preview-row1'>
          <AccessTimeIcon /><span style={{paddingLeft: "5px", paddingRight: "15px", fontSize: "20px"}}>{preparation} <span style={{fontSize: "16px"}}>mins</span></span>
          <WhatshotIcon /><span style={{paddingLeft: "5px", fontSize: "20px"}}>{cook_time} <span style={{fontSize: "16px"}}>mins</span></span>
        </div>
        <div className='recipe-preview-row2'>
          <PersonOutlineIcon /><span style={{paddingLeft: "5px", fontSize: "20px"}}>{servings} <span style={{fontSize: "16px"}}>people</span></span>
        </div>
      </div>
    </div>
  );
}


export default withRouter(RecipePreview);