import React from 'react';
import './SearchBar.styles.css';

import SearchbarFilter from '../searchbar-filter/SearchbarFilter';

const PublicSearchBar = ({ onChange, value, children }) => {
  return (
    <div className="search">
      <input type="text" onChange={onChange} value={value} className="searchTerm" placeholder={`${children}`} />
      <SearchbarFilter />
      <button type="submit" className="searchButton">
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
}

export default PublicSearchBar;