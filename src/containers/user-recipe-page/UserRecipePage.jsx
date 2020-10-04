import React, { Component } from 'react';
import './UserRecipePage.styles.scss';

import SearchBar from '../../components/searchbar/SearchBar';
import PersonalInfo from '../../components/personal-info/PersonalInfo';
import ErrorBoundry from '../../components/error-boundry/ErrorBoundry';
import RecipesOverview from '../../components/recipes-overview/RecipesOverview';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { 
  requestAllUserRecipes, 
  requestFilteredUserRecipes
} from '../../redux/user-recipes/user.recipes.actions';
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
  componentDidMount() {
    this.props.requestAllUserRecipes(this.props.token);
  }

  handleChange = event => {
    this.props.requestFilteredUserRecipes(event.target.value);
  }

  render() {
    const { isPending, userRecipes, filteredUserRecipes } = this.props;
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
                filteredUserRecipes.length === 0 ? <RecipesOverview recipes={userRecipes} />
                : typeof(filteredUserRecipes) === 'string' ? <div><h4>{filteredUserRecipes}</h4></div>
                  : <RecipesOverview recipes={filteredUserRecipes} />
              }
            </ErrorBoundry>
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