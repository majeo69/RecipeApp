import React from 'react';
import './ExplorePage.styles.scss';

import SearchBar from '../../components/searchbar/SearchBar';

const ExplorePage = () => {
  return (
    <div className='explore-page-container'>
      <div className='explore-searchbar-container'>
        <SearchBar className='searchbar-explore'>Explore universe recipes from here!</SearchBar>
      </div>
    </div>
  );
}

export default ExplorePage;