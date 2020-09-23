import React from 'react';
import './SearchBar.styles.css';

const SearchBar = () => {
  return (
    <div className="s">
      <div className="search">
        <input type="text" className="searchTerm" placeholder="What recipe are you looking for?" />
        <button type="submit" className="searchButton">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;