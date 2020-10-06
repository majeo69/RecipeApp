import React, { Component } from 'react';
import './UserRecipePage.styles.scss';
import { withRouter } from 'react-router-dom';

import SearchBar from '../../components/searchbar/SearchBar';
import PersonalInfo from '../../components/personal-info/PersonalInfo';
import ErrorBoundry from '../../components/error-boundry/ErrorBoundry';
import RecipesOverview from '../../components/recipes-overview/RecipesOverview';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Pagination from '@material-ui/lab/Pagination';

import { userPagination } from '../../utils/user-recipes.utils';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { 
  requestAllUserRecipes, 
  requestFilteredUserRecipes, 
  setUserCurrentPage, 
  setUserTotalPage 
} from '../../redux/user-recipes/user.recipes.actions';
import { 
  selectUserRecipesPending, 
  selectAllUserRecipes, 
  selectFilteredUserRecipes,
  selectUserCurrentPage,
  selectUserTotalPages 
} from '../../redux/user-recipes/user.recipes.selectors';
import { selectUserToken } from '../../redux/user/user.selectors';


const mapStateToProps = createStructuredSelector({
  isPending: selectUserRecipesPending,
  userRecipes: selectAllUserRecipes,
  filteredUserRecipes: selectFilteredUserRecipes,
  userCurrentPage: selectUserCurrentPage,
  userTotalPages: selectUserTotalPages,
  token: selectUserToken
});

const mapDispatchToProps = (dispatch) => ({
  requestAllUserRecipes: (token) => dispatch(requestAllUserRecipes(token)),
  requestFilteredUserRecipes: (keyword) => dispatch(requestFilteredUserRecipes(keyword)),
  setUserCurrentPage: (data) => dispatch(setUserCurrentPage(data)),
  setUserTotalPage: (data) => dispatch(setUserTotalPage(data))
})

class UserRecipePage extends Component {
  componentDidMount() {
    if (this.props.userRecipes.length === 0) {
      this.props.requestAllUserRecipes(this.props.token);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filteredUserRecipes !== this.props.filteredUserRecipes
      && typeof(this.props.filteredUserRecipes) === 'string') {
        this.props.setUserTotalPage(0)
    }
    if ( prevProps.filteredUserRecipes !== this.props.filteredUserRecipes
      && this.props.filteredUserRecipes !== []
      && typeof(this.props.filteredUserRecipes) !== 'string') {
        this.props.setUserTotalPage(Math.ceil(this.props.filteredUserRecipes.length / 6));
      } else if (prevProps.userRecipes !== this.props.userRecipes) {
      this.props.setUserTotalPage(Math.ceil(this.props.userRecipes.length / 6))
    }
  }

  handleChange = event => {
    this.props.requestFilteredUserRecipes(event.target.value);
  }

  handlePagination = (event, value) => {
    this.props.setUserCurrentPage(value)
  };

  render() {
    const { isPending, userRecipes, filteredUserRecipes, userCurrentPage, userTotalPages, history } = this.props;
    const userRecipesPagination = userPagination(userRecipes, filteredUserRecipes, userCurrentPage, userTotalPages);
    return (
      <div className='user-recipe-page-container'>
        <div className='user-recipe-container'>
          <div className='user-searchbar-container'>
            <SearchBar onChange={this.handleChange} className='searchbar-user'>Explore Your Own Recipe here</SearchBar>
            <div className='create-recipe-button'>
              <Button 
                onClick={() => {history.push('/createrecipe');}}
                variant="contained" color="default" startIcon={<AddIcon />} >Create Recipe
              </Button>
            </div>
          </div>
          {
            isPending ? 
            <div>
              <h1>Loading...</h1> 
              <h4>If the recipes do not load up in 20 seconds, please reload your browser again.</h4>
            </div>
            :
            <ErrorBoundry>
              {
                typeof(userRecipesPagination) === 'string' ? <div><h4>{userRecipesPagination}</h4></div>
                : <RecipesOverview recipes={userRecipesPagination} />
              }
            </ErrorBoundry>
          }
          {
            userTotalPages === 0 ? null 
            :
            <div className='user-pagination-container'>
              <Pagination 
                variant="outlined" 
                count={userTotalPages} 
                page={userCurrentPage} 
                onChange={this.handlePagination} 
              />
            </div>
          }
        </div>
        <div className='personal-info-container'>
          <PersonalInfo />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserRecipePage));