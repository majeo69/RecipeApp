import React, { Component } from 'react';
import './ExplorePage.styles.scss';

import SearchBar from '../../components/searchbar/SearchBar';
import ErrorBoundry from '../../components/error-boundry/ErrorBoundry';
import RecipesOverview from '../../components/recipes-overview/RecipesOverview';

import { connect } from 'react-redux';
import { requestAllPublicRecipes, requestFilteredPublicRecipes } from '../../redux/puclic-recipes/public.recipes.actions'
import { createStructuredSelector } from 'reselect';
import { 
  selectPublicRecipesPending,
  selectAllPublicRecipes,
  selectFilteredPublicRecipes 
} from '../../redux/puclic-recipes/public.recipes.selectors'


const mapStateToProps = createStructuredSelector({
  isPending: selectPublicRecipesPending,
  publicRecipes: selectAllPublicRecipes,
  filteredPublicRecipes: selectFilteredPublicRecipes
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPublicRecipes: () => dispatch(requestAllPublicRecipes()),
  requestFilteredPublicRecipes: keyword => dispatch(requestFilteredPublicRecipes(keyword))
})

class ExplorePage extends Component {
  componentDidMount() {
    this.props.requestAllPublicRecipes();
  }

  handleChange = event => {
    this.props.requestFilteredPublicRecipes(event.target.value)
  }

  render() {
    const { isPending, publicRecipes, filteredPublicRecipes } = this.props;
    return (
      <div className='explore-page-container'>
        <div className='explore-searchbar-container'>
          <SearchBar onChange={this.handleChange} className='searchbar-explore'>Explore universe recipes from here!</SearchBar>
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
              {
                filteredPublicRecipes.length === 0 ? <RecipesOverview recipes={publicRecipes} />
                : typeof(filteredPublicRecipes) === 'string' ? <div><h4>{filteredPublicRecipes}</h4></div>
                  : <RecipesOverview recipes={filteredPublicRecipes} />
              }
            </ErrorBoundry>
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage);