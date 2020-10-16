import React from 'react';
import './RecipePage.styles.scss';

import RecipeDetails from '../../components/recipe-details/RecipeDetails';
import PersonalInfo from '../../components/personal-info/PersonalInfo';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserId } from '../../redux/user/user.selectors';

const mapStateToProps = createStructuredSelector({
  userId: selectUserId
})

const RecipePage = (props) => {
  const recipe = props.location.state.detailedRecipe
  return (
    <div className='recipe-details-page-container'>
      <div className='details-box'>
        <RecipeDetails recipe={recipe} history={props.history}/>
      </div>
      {
        props.userId !== 'no-user' ?
        <div className='personal-info-box'>
          <PersonalInfo />
        </div>
        : null
      }
    </div>
  );
}

export default connect(mapStateToProps)(RecipePage);