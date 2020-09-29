import React from 'react';
import './SearchBar.styles.css';

const SearchBar = ({ children }) => {
  return (
    <div className="s">
      <div className="search">
        <input type="text" className="searchTerm" placeholder={`${children}`} />
        <button type="submit" className="searchButton">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;