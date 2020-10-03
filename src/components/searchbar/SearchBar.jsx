import React from 'react';
import './SearchBar.styles.css';

const SearchBar = ({ onChange, children }) => {
  return (
    <div className="search">
      <input type="text" onChange={onChange} className="searchTerm" placeholder={`${children}`} />
      <button type="submit" className="searchButton">
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
}

export default SearchBar;