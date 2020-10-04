import React, { Component } from 'react';
import './UserRecipePage.styles.scss';

import SearchBar from '../../components/searchbar/SearchBar';
import PersonalInfo from '../../components/personal-info/PersonalInfo';
import ErrorBoundry from '../../components/error-boundry/ErrorBoundry';
import RecipesOverview from '../../components/recipes-overview/RecipesOverview';
import Pagination from '@material-ui/lab/Pagination';

import { userPagination } from '../../utils/user-recipes.utils';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { requestAllUserRecipes, requestFilteredUserRecipes } from '../../redux/user-recipes/user.recipes.actions';
import { 
  selectUserRecipesPending, 
  selectAllUserRecipes, 
  selectFilteredUserRecipes 
} from '../../redux/user-recipes/user.recipes.selectors';
import { selectUserToken } from '../../redux/user/user.selectors';


const mapStateToProps = createStructuredSelector({
  isPending: selectUserRecipesPending,
  userRecipes: selectAllUserRecipes,
  filteredUserRecipes: selectFilteredUserRecipes,
  token: selectUserToken
});

const mapDispatchToProps = (dispatch) => ({
  requestAllUserRecipes: (token) => dispatch(requestAllUserRecipes(token)),
  requestFilteredUserRecipes: (keyword) => dispatch(requestFilteredUserRecipes(keyword))
})

class UserRecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: 0
    }
  }

  componentDidMount() {
    this.props.requestAllUserRecipes(this.props.token);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filteredUserRecipes !== this.props.filteredUserRecipes
      && typeof(this.props.filteredUserRecipes) === 'string') {
        this.setState({ totalPages: 0});
    }
    if ( prevProps.filteredUserRecipes !== this.props.filteredUserRecipes
      && this.props.filteredUserRecipes !== []
      && typeof(this.props.filteredUserRecipes) !== 'string') {
        this.setState({ totalPages: Math.ceil(this.props.filteredUserRecipes.length / 6) });
      } else if (prevProps.userRecipes !== this.props.userRecipes) {
      this.setState({ totalPages: Math.ceil(this.props.userRecipes.length / 6) });
    }
  }

  handleChange = event => {
    this.props.requestFilteredUserRecipes(event.target.value);
  }

  handlePagination = (event, value) => {
    this.setState({ currentPage: value });
  };

  render() {
    const { currentPage, totalPages } = this.state;
    const { isPending, userRecipes, filteredUserRecipes } = this.props;
    const userRecipesPagination = userPagination(userRecipes, filteredUserRecipes, currentPage, totalPages);
    return (
      <div className='user-recipe-page-container'>
        <div className='user-recipe-container'>
          <div className='user-searchbar-container'>
            <SearchBar onChange={this.handleChange} className='searchbar-user'>Explore Your Own Recipe here</SearchBar>
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
            this.state.totalPages === 0 ? null 
            :
            <div className='user-pagination-container'>
              <Pagination 
                variant="outlined" 
                count={this.state.totalPages} 
                page={this.state.currentPage} 
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


export default connect(mapStateToProps, mapDispatchToProps)(UserRecipePage);