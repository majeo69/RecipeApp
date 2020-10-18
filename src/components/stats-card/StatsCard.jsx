import React from 'react';
import './StatsCard.scss';

import DescriptionIcon from '@material-ui/icons/Description';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAllUserRecipes, selectUsersPublicCount } from '../../redux/user-recipes/user.recipes.selectors';

const mapStateToProps = createStructuredSelector({
  allUserRecipes: selectAllUserRecipes,
  usersPublicCount: selectUsersPublicCount
});

const StatsCard = ({ allUserRecipes, usersPublicCount }) => {
  return (
    <div className='stats-card'>
      <h5>Stats:</h5>
      <div className='stats-col'><DescriptionIcon /> {allUserRecipes.length} recipes</div>
      <div className='stats-col'><DescriptionIcon /> {usersPublicCount} public</div>
      <div className='stats-col'><DescriptionIcon /> {allUserRecipes.length - usersPublicCount} private</div>
    </div>
  );
}

export default connect(mapStateToProps)(StatsCard);
