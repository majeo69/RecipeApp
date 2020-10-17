import React, { Component } from 'react';
import './UserRecipePage.styles.scss';
import { withRouter } from 'react-router-dom';

import Loading from '../../components/loading/Loading';
import SearchBar from '../../components/searchbar/SearchBar';
import PersonalInfo from '../../components/personal-info/PersonalInfo';
import ErrorBoundry from '../../components/error-boundry/ErrorBoundry';
import RecipesOverview from '../../components/recipes-overview/RecipesOverview';
import InitialUserPage from '../../components/initial-user-page/InitialUserPage';

import AddIcon from '@material-ui/icons/Add';
import Pagination from '@material-ui/lab/Pagination';
import CreateRecipeStyledButton from '../../components/styled-buttons/CreateRecipeStyledButton';

import { userPagination } from '../../utils/user-recipes.utils';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { resetUpdateRecipe } from '../../redux/update-recipe/update.recipe.actions';
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
  setUserTotalPage: (data) => dispatch(setUserTotalPage(data)),
  resetUpdateRecipe: () => dispatch(resetUpdateRecipe())
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
    const { isPending, userRecipes, filteredUserRecipes, userCurrentPage, userTotalPages, history, resetUpdateRecipe } = this.props;
    const userRecipesPagination = userPagination(userRecipes, filteredUserRecipes, userCurrentPage, userTotalPages);
    return (
      <div className='user-recipe-page-container'>
        <div className='user-recipe-container'>
          {
            isPending ? <Loading /> :
              <div>
                <div className='user-searchbar-container'>
                  <SearchBar onChange={this.handleChange} className='searchbar-user'>Search...</SearchBar>
                  <div className='create-recipe-button'>
                    <CreateRecipeStyledButton startIcon={<AddIcon />} 
                      onClick={() => {
                        resetUpdateRecipe();
                        history.push('/createrecipe');}}>
                      <span>Create Recipe</span>
                    </CreateRecipeStyledButton>
                  </div>
                </div>
                {
                  userRecipes.length === 0 ? <InitialUserPage />
                  :
                  <div>
                    <ErrorBoundry>
                    {
                      typeof(userRecipesPagination) === 'string' ? <div><h4>{userRecipesPagination}</h4></div>
                      : <RecipesOverview recipes={userRecipesPagination} />
                    }
                    </ErrorBoundry>
                    {
                      userTotalPages === 0 ? null 
                      :
                      <div className='user-pagination-container'>
                        <Pagination 
                          color='secondary'
                          count={userTotalPages} 
                          page={userCurrentPage} 
                          onChange={this.handlePagination} 
                        />
                      </div>
                    }
                  </div>
                }
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