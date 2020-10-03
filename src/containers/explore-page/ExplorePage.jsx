import React, { Component } from 'react';
import './ExplorePage.styles.scss';

import { connect } from 'react-redux';
import { requestAllPublicRecipes } from '../../redux/puclic-recipes/public.recipes.actions'

import SearchBar from '../../components/searchbar/SearchBar';
import ErrorBoundry from '../../components/error-boundry/ErrorBoundry';
import RecipesOverview from '../../components/recipes-overview/RecipesOverview';

const mapStateToProps = (state) => ({
  isPending: state.publicRecipes.isPending,
  publicRecipes: state.publicRecipes.publicRecipes
})
const mapDispatchToProps = (dispatch) => {
  return {
    requestAllPublicRecipes: () => dispatch(requestAllPublicRecipes())
  }
}

class ExplorePage extends Component {
  componentDidMount() {
    this.props.requestAllPublicRecipes();
  }

  render() {
    const { isPending, publicRecipes } = this.props;
    return (
      <div className='explore-page-container'>
        <div className='explore-searchbar-container'>
          <SearchBar className='searchbar-explore'>Explore universe recipes from here!</SearchBar>
        </div>
        <div className='explore-recipes-container'>
          {
            isPending ? 
            <div>
              <h1>Loading...</h1> 
              <h4>If the recipes do not load up in 20 seconds, please reload your browser again.</h4>
            </div>
            :
            <ErrorBoundry>
              <RecipesOverview recipes={publicRecipes} />
            </ErrorBoundry>
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage);