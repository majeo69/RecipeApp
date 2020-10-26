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
  resetFilteredPublicRecipes,
  resetPublicKeyword,
  setPublicSelectedType,
  setCurrentPage, 
  setTotalPage 
} from '../../redux/puclic-recipes/public.recipes.actions';
import { 
  selectPublicRecipesPending,
  selectAllPublicRecipes,
  selectFilteredPublicRecipes,
  selectFilteredPublicKeyword,
  selectPublicSelectedType,
  selectPublicCurrentPage,
  selectPublicTotalPages
} from '../../redux/puclic-recipes/public.recipes.selectors';


const mapStateToProps = createStructuredSelector({
  isPending: selectPublicRecipesPending,
  publicRecipes: selectAllPublicRecipes,
  filteredPublicRecipes: selectFilteredPublicRecipes,
  publicKeyword: selectFilteredPublicKeyword,
  publicSelectedType: selectPublicSelectedType,
  publicCurrentPage: selectPublicCurrentPage,
  publicTotalPages: selectPublicTotalPages
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPublicRecipes: (url_to_match) => dispatch(requestAllPublicRecipes(url_to_match)),
  requestFilteredPublicRecipes: keyword => dispatch(requestFilteredPublicRecipes(keyword)),
  resetFilteredPublicRecipes: () => dispatch(resetFilteredPublicRecipes()),
  resetPublicKeyword: () => dispatch(resetPublicKeyword()),
  setPublicSelectedType: (selectedType) => dispatch(setPublicSelectedType(selectedType)),
  setPublicCurrentPage: (data) => dispatch(setCurrentPage(data)),
  setPublicTotalPage: (data) => dispatch(setTotalPage(data))
});

class ExplorePage extends Component {
  componentDidMount() {
    if (this.props.publicSelectedType === 'All') {
      this.props.requestAllPublicRecipes('public');
    } else {
      this.props.requestAllPublicRecipes(`public/${this.props.publicSelectedType.toLowerCase()}`);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.filteredPublicRecipes !== this.props.filteredPublicRecipes
      && typeof(this.props.filteredPublicRecipes) === 'string') {
        this.props.setPublicTotalPage(0);
    }
    if (prevProps.filteredPublicRecipes !== this.props.filteredPublicRecipes
      && this.props.filteredPublicRecipes !== []
      && typeof(this.props.filteredPublicRecipes) !== 'string') {
        this.props.setPublicTotalPage(Math.ceil(this.props.filteredPublicRecipes.length / 9));
      } else if (prevProps.publicRecipes !== this.props.publicRecipes) {
        this.props.setPublicTotalPage(Math.ceil(this.props.publicRecipes.length / 9));
    }
  }

  handleChange = event => {
    this.props.requestFilteredPublicRecipes(event.target.value);
  }

  handleRadioChange = event => {
    this.props.setPublicSelectedType(event.target.value);
    this.props.resetPublicKeyword();
    this.props.resetFilteredPublicRecipes();
    this.props.setPublicCurrentPage(1);
    if (event.target.value === 'All') {
      this.props.requestAllPublicRecipes('public');
    } else {
      this.props.requestAllPublicRecipes(`public/${event.target.value.toLowerCase()}`);
    }
  }

  onSelectRandom = event => {
    this.props.setPublicCurrentPage(1);
    this.props.requestFilteredPublicRecipes('random');
  }

  handlePagination = (event, value) => {
    this.props.setPublicCurrentPage(value);
  };

  render() {
    const { isPending, publicRecipes, publicSelectedType, publicKeyword, filteredPublicRecipes, publicCurrentPage, publicTotalPages } = this.props;
    const publicRecipesPagination = publicPagination(publicRecipes, publicKeyword, filteredPublicRecipes, publicCurrentPage, publicTotalPages);

    return (
      <div className='explore-page-container'>
        <h1>Explore.</h1>
        <div className='explore-search-container'>
          <div className='explore-search-col-1'>
            <SearchBar onChange={this.handleChange} value={`${publicKeyword==='random' ? '' : publicKeyword}`} className='searchbar-explore'>
              ex. Chocolate tart
            </SearchBar>
          </div>
          <div className='explore-search-col-2'>
            <FormControl component="fieldset">
              <RadioGroup row name="selectFoodType" value={publicSelectedType} onChange={this.handleRadioChange}>
                <FormControlLabel value="All" control={<Radio color='primary' />} label="All" />
                <FormControlLabel value="Meal" control={<Radio color='primary' />} label="Meal" />
                <FormControlLabel value="Dessert" control={<Radio color='primary' />} label="Dessert" />
                <FormControlLabel value="Drink" control={<Radio color='primary' />} label="Drink" />
              </RadioGroup>
            </FormControl>
            <StyledColorfulButton size="small" onClick={this.onSelectRandom}>Random</StyledColorfulButton>
          </div>
        </div>
        {
          isPending ? <Loading /> :
          <div className='explore-page-main-container'>
            {
              publicKeyword === 'random' ? 
                <h5>Here's a random recipe picked from <span>{publicSelectedType}</span> category! <br/> 
                    Refresh (Crl+R) the page if you no longer want a random recipe.</h5>
              : null
            }
            <ErrorBoundry>
              {
                typeof(publicRecipesPagination) === 'string' ?
                <EmptyMatch emptyMsg={"No matches found!"}/>
                : <RecipesOverview recipes={publicRecipesPagination} />
              }
            </ErrorBoundry> 
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