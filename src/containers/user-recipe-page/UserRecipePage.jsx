import React from 'react';
import './UserRecipePage.styles.scss';

import SearchBar from '../../components/searchbar/SearchBar';

const UserRecipePage = () => {
  return (
    <div className='user-recipe-page-container'>
      <div className='user-recipe-container'>
        <div className='user-searchbar-container'>
          <SearchBar className='searchbar-user'>Explore Your Own Recipe here</SearchBar>
        </div>
      </div>
      <div className='personal-info-container'>
        <h2>This section if for palcing personal information.</h2>
      </div>
    </div>
  );
}

export default UserRecipePage;