import React, { Component } from 'react';
import './CategoryButton.styles.scss';

import { connect } from 'react-redux';
import { 
  requestAllPublicRecipes, 
  resetFilteredPublicRecipes,
  resetPublicKeyword,
  setPublicSelectedType,
  setCurrentPage
} from '../../redux/puclic-recipes/public.recipes.actions';

const mapDispatchToProps = (dispatch) => ({
  requestAllPublicRecipes: (url_to_match) => dispatch(requestAllPublicRecipes(url_to_match)),
  resetFilteredPublicRecipes: () => dispatch(resetFilteredPublicRecipes()),
  resetPublicKeyword: () => dispatch(resetPublicKeyword()),
  setPublicSelectedType: (selectedType) => dispatch(setPublicSelectedType(selectedType)),
  setPublicCurrentPage: (data) => dispatch(setCurrentPage(data))
});

class CategoryButton extends Component {
  handleCategoryChange = event => {
    console.log(event.currentTarget.value)
    this.props.setPublicSelectedType(event.currentTarget.value);
    this.props.resetPublicKeyword();
    this.props.resetFilteredPublicRecipes();
    this.props.setPublicCurrentPage(1);
    if (event.currentTarget.value === 'All') {
      this.props.requestAllPublicRecipes('public');
    } else {
      this.props.requestAllPublicRecipes(`public/${event.currentTarget.value.toLowerCase()}`);
    }
  }

  render () {
    const { category, category_active } = this.props;
    return (
      <button type='button' value={category} onClick={this.handleCategoryChange}
        className={`category-btn ${category_active === "true" ? 'category-active': ''}`} >
        <span>{category}</span>
      </button>
    );
  }
}

export default connect(null, mapDispatchToProps)(CategoryButton);