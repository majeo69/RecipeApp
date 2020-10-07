import React, { Component } from 'react';
import './ExplorePage.styles.scss';

import Loading from '../../components/loading/Loading';
import SearchBar from '../../components/searchbar/SearchBar';
import ErrorBoundry from '../../components/error-boundry/ErrorBoundry';
import RecipesOverview from '../../components/recipes-overview/RecipesOverview';
import Pagination from '@material-ui/lab/Pagination';

import { publicPagination } from '../../utils/public-recipes.utils';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { 
  requestAllPublicRecipes, 
  requestFilteredPublicRecipes, 
  setCurrentPage, 
  setTotalPage 
} from '../../redux/puclic-recipes/public.recipes.actions';
import { 
  selectPublicRecipesPending,
  selectAllPublicRecipes,
  selectFilteredPublicRecipes,
  selectPublicCurrentPage,
  selectPublicTotalPages
} from '../../redux/puclic-recipes/public.recipes.selectors';


const mapStateToProps = createStructuredSelector({
  isPending: selectPublicRecipesPending,
  publicRecipes: selectAllPublicRecipes,
  filteredPublicRecipes: selectFilteredPublicRecipes,
  publicCurrentPage: selectPublicCurrentPage,
  publicTotalPages: selectPublicTotalPages
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPublicRecipes: () => dispatch(requestAllPublicRecipes()),
  requestFilteredPublicRecipes: keyword => dispatch(requestFilteredPublicRecipes(keyword)),
  setPublicCurrentPage: (data) => dispatch(setCurrentPage(data)),
  setPublicTotalPage: (data) => dispatch(setTotalPage(data))
});

class ExplorePage extends Component {
  componentDidMount() {
    if (this.props.publicRecipes.length === 0){
      this.props.requestAllPublicRecipes();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.filteredPublicRecipes !== this.props.filteredPublicRecipes
      && typeof(this.props.filteredPublicRecipes) === 'string') {
        this.props.setPublicTotalPage(0)
    }
    if ( prevProps.filteredPublicRecipes !== this.props.filteredPublicRecipes
      && this.props.filteredPublicRecipes !== []
      && typeof(this.props.filteredPublicRecipes) !== 'string') {
        this.props.setPublicTotalPage(Math.ceil(this.props.filteredPublicRecipes.length / 8))
      } else if (prevProps.publicRecipes !== this.props.publicRecipes) {
      this.props.setPublicTotalPage(Math.ceil(this.props.publicRecipes.length / 8))
    }
  }

  handleChange = event => {
    this.props.requestFilteredPublicRecipes(event.target.value);
  }

  handlePagination = (event, value) => {
    this.props.setPublicCurrentPage(value)
  };

  render() {
    const { isPending, publicRecipes, filteredPublicRecipes, publicCurrentPage, publicTotalPages } = this.props;
    const publicRecipesPagination = publicPagination(publicRecipes, filteredPublicRecipes, publicCurrentPage, publicTotalPages);

    return (
      <div className='explore-page-container'>
        {
          isPending ? <Loading /> :
          <div>
            <div className='explore-searchbar-container'>
              <SearchBar onChange={this.handleChange} className='searchbar-explore'>
                Explore universe recipes from here!
              </SearchBar>
            </div>
            <div className='explore-recipes-container'>
              <ErrorBoundry>
                {
                  typeof(publicRecipesPagination) === 'string' ? <div><h4>{publicRecipesPagination}</h4></div>
                  : <RecipesOverview recipes={publicRecipesPagination} />
                }
              </ErrorBoundry>
            </div>
            {
              publicTotalPages === 0 ? null 
              :
              <div className='public-pagination-container'>
                <Pagination 
                  variant="outlined" 
                  count={publicTotalPages} 
                  page={publicCurrentPage} 
                  onChange={this.handlePagination} 
                />
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage);