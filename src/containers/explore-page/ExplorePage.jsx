import React, { Component } from 'react';
import './ExplorePage.styles.scss';

import SearchBar from '../../components/searchbar/SearchBar';
import ErrorBoundry from '../../components/error-boundry/ErrorBoundry';
import RecipesOverview from '../../components/recipes-overview/RecipesOverview';
import Pagination from '@material-ui/lab/Pagination';

import { publicPagination } from '../../utils/public-recipes.utils';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { requestAllPublicRecipes, requestFilteredPublicRecipes } from '../../redux/puclic-recipes/public.recipes.actions';
import { 
  selectPublicRecipesPending,
  selectAllPublicRecipes,
  selectFilteredPublicRecipes
} from '../../redux/puclic-recipes/public.recipes.selectors';

const mapStateToProps = createStructuredSelector({
  isPending: selectPublicRecipesPending,
  publicRecipes: selectAllPublicRecipes,
  filteredPublicRecipes: selectFilteredPublicRecipes
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPublicRecipes: () => dispatch(requestAllPublicRecipes()),
  requestFilteredPublicRecipes: keyword => dispatch(requestFilteredPublicRecipes(keyword))
});

class ExplorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: 0
    }
  }
  componentDidMount() {
    this.props.requestAllPublicRecipes();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.filteredPublicRecipes !== this.props.filteredPublicRecipes
      && typeof(this.props.filteredPublicRecipes) === 'string') {
        this.setState({ totalPages: 0});
    }
    if ( prevProps.filteredPublicRecipes !== this.props.filteredPublicRecipes
      && this.props.filteredPublicRecipes !== []
      && typeof(this.props.filteredPublicRecipes) !== 'string') {
        this.setState({ totalPages: Math.ceil(this.props.filteredPublicRecipes.length / 8) });
      } else if (prevProps.publicRecipes !== this.props.publicRecipes) {
      this.setState({ totalPages: Math.ceil(this.props.publicRecipes.length / 8) });
    }
  }

  handleChange = event => {
    this.props.requestFilteredPublicRecipes(event.target.value);
  }

  handlePagination = (event, value) => {
    this.setState({ currentPage: value });
  };

  render() {
    const { currentPage, totalPages } = this.state;
    const { isPending, publicRecipes, filteredPublicRecipes } = this.props;
    const publicRecipesPagination = publicPagination(publicRecipes, filteredPublicRecipes, currentPage, totalPages);
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
                typeof(publicRecipesPagination) === 'string' ? <div><h4>{publicRecipesPagination}</h4></div>
                : <RecipesOverview recipes={publicRecipesPagination} />
              }
            </ErrorBoundry>
          }
        </div>
        {
          this.state.totalPages === 0 ? null 
          :
          <div className='public-pagination-container'>
            <Pagination 
              variant="outlined" 
              count={this.state.totalPages} 
              page={this.state.currentPage} 
              onChange={this.handlePagination} 
            />
          </div>
        }
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage);