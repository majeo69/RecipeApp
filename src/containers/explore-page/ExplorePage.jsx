import React, { Component } from 'react';
import './ExplorePage.styles.scss';

import Loading from '../../components/loading/Loading';
import SearchBar from '../../components/searchbar/SearchBar';
import ErrorBoundry from '../../components/error-boundry/ErrorBoundry';
import RecipesOverview from '../../components/recipes-overview/RecipesOverview';
import Pagination from '@material-ui/lab/Pagination';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import StyledColorfulButton from '../../components/styled-buttons/StyledColorfulButton';

import EmptyMatch from '../../components/empty-match/EmptyMatch';
import { publicPagination } from '../../utils/public-recipes.utils';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { 
  requestAllPublicRecipes, 
  requestFilteredPublicRecipes,
  resetPublicKeyword,
  setCurrentPage, 
  setTotalPage 
} from '../../redux/puclic-recipes/public.recipes.actions';
import { 
  selectPublicRecipesPending,
  selectAllPublicRecipes,
  selectFilteredPublicRecipes,
  selectFilteredPublicKeyword,
  selectPublicCurrentPage,
  selectPublicTotalPages
} from '../../redux/puclic-recipes/public.recipes.selectors';


const mapStateToProps = createStructuredSelector({
  isPending: selectPublicRecipesPending,
  publicRecipes: selectAllPublicRecipes,
  filteredPublicRecipes: selectFilteredPublicRecipes,
  publicKeyword: selectFilteredPublicKeyword,
  publicCurrentPage: selectPublicCurrentPage,
  publicTotalPages: selectPublicTotalPages
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPublicRecipes: (url_to_match) => dispatch(requestAllPublicRecipes(url_to_match)),
  requestFilteredPublicRecipes: keyword => dispatch(requestFilteredPublicRecipes(keyword)),
  resetPublicKeyword: () => dispatch(resetPublicKeyword()),
  setPublicCurrentPage: (data) => dispatch(setCurrentPage(data)),
  setPublicTotalPage: (data) => dispatch(setTotalPage(data))
});

class ExplorePage extends Component {
  constructor() {
    super();
    this.state = {
      search_type: 'All'
    }
  }
  async componentDidMount() {
    if (this.props.publicRecipes.length === 0){
      await this.props.requestAllPublicRecipes('public');
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
        this.props.setPublicTotalPage(Math.ceil(this.props.filteredPublicRecipes.length / 9))
      } else if (prevProps.publicRecipes !== this.props.publicRecipes) {
      this.props.setPublicTotalPage(Math.ceil(this.props.publicRecipes.length / 9))
    }
  }

  handleChange = event => {
    this.props.requestFilteredPublicRecipes(event.target.value);
  }

  handleRadioChange = event => {
    this.setState({ search_type: event.target.value })
    this.props.resetPublicKeyword();
    if (event.target.value === 'All') {
      this.props.requestAllPublicRecipes('public');
    } else {
      this.props.requestAllPublicRecipes(`public/${event.target.value.toLowerCase()}`);
    }
  }

  onSelectRandom = event => {
    this.props.requestFilteredPublicRecipes('random');
  }

  handlePagination = (event, value) => {
    this.props.setPublicCurrentPage(value)
  };

  render() {
    const { isPending, publicRecipes, publicKeyword, filteredPublicRecipes, publicCurrentPage, publicTotalPages } = this.props;
    const publicRecipesPagination = publicPagination(publicRecipes, publicKeyword, filteredPublicRecipes, publicCurrentPage, publicTotalPages);

    return (
      <div className='explore-page-container'>
        <div className='explore-search-container'>
          <div className='explore-search-col-1'>
            <SearchBar onChange={this.handleChange} className='searchbar-explore'>
              ex. Chocolate tart
            </SearchBar>
          </div>
          <div className='explore-search-col-2'>
            <FormControl component="fieldset">
              <RadioGroup row name="selectFoodType" value={this.state.search_type} onChange={this.handleRadioChange}>
                <FormControlLabel value="All" control={<Radio />} label="All" />
                <FormControlLabel value="Meal" control={<Radio />} label="Meal" />
                <FormControlLabel value="Dessert" control={<Radio />} label="Dessert" />
                <FormControlLabel value="Drink" control={<Radio />} label="Drink" />
              </RadioGroup>
            </FormControl>
            <StyledColorfulButton size="small" onClick={this.onSelectRandom}>Random</StyledColorfulButton>
          </div>
        </div>
        {
          isPending ? <Loading /> :
          <div>
            <div className='explore-recipes-container'>
              <ErrorBoundry>
                {
                  typeof(publicRecipesPagination) === 'string' ?
                  <EmptyMatch emptyMsg={"No matches found!"}/>
                  : <RecipesOverview recipes={publicRecipesPagination} />
                }
              </ErrorBoundry>
            </div>
            {
              publicTotalPages === 0 ? null 
              :
              <div className='public-pagination-container'>
                <Pagination 
                  variant='outlined'
                  color='primary'
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