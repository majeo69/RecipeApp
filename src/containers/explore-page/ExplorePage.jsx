import React from 'react';
import './ExplorePage.styles.css';

import SearchBar from '../../components/searchbar/SearchBar';

const ExplorePage = () => {
  return (
    <div className='explore-container'>
      <div className='searchbar-container'>
        <SearchBar className='searchbar-explore' />
      </div>
    </div>
  );
}

export default ExplorePage;