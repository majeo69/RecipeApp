import React from 'react';
import './StatsCard.scss';

import DescriptionIcon from '@material-ui/icons/Description';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUsersTotalCount, selectUsersPublicCount } from '../../redux/user-recipes/user.recipes.selectors';

const mapStateToProps = createStructuredSelector({
  usersTotalCount: selectUsersTotalCount,
  usersPublicCount: selectUsersPublicCount
});

const StatsCard = ({ usersTotalCount, usersPublicCount }) => {
  return (
    <div className='stats-card'>
      <h5>Stats:</h5>
      <div className='stats-col'><DescriptionIcon /> {usersTotalCount} recipe(s)</div>
      <div className='stats-col'><DescriptionIcon /> {usersPublicCount} public</div>
      <div className='stats-col'><DescriptionIcon /> {usersTotalCount - usersPublicCount} private</div>
    </div>
  );
}

export default connect(mapStateToProps)(StatsCard);
