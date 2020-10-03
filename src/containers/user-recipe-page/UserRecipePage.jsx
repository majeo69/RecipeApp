import React, { Component } from 'react';
import './UserRecipePage.styles.scss';

import SearchBar from '../../components/searchbar/SearchBar';
import PersonalInfo from '../../components/personal-info/PersonalInfo';
import ErrorBoundry from '../../components/error-boundry/ErrorBoundry';
import RecipesOverview from '../../components/recipes-overview/RecipesOverview';

import { connect } from 'react-redux';
import { requestAllUserRecipes } from '../../redux/user-recipes/user.recipes.actions';

const mapStateToProps = (state) => ({
  isPending: state.userRecipes.isPending,
  userRecipes: state.userRecipes.userRecipes,
  token: state.user.currentUser.token
})

const mapDispatchToProps = (dispatch) => ({
  requestAllUserRecipes: (token) => dispatch(requestAllUserRecipes(token))
})

class UserRecipePage extends Component {
  componentDidMount() {
    this.props.requestAllUserRecipes(this.props.token);
  }

  render() {
    const { isPending, userRecipes } = this.props;
    return (
      <div className='user-recipe-page-container'>
        <div className='user-recipe-container'>
          <div className='user-searchbar-container'>
            <SearchBar className='searchbar-user'>Explore Your Own Recipe here</SearchBar>
          </div>
          {
            isPending ? 
            <div>
              <h1>Loading...</h1> 
              <h4>If the recipes do not load up in 20 seconds, please reload your browser again.</h4>
            </div>
            :
            <ErrorBoundry>
              <RecipesOverview recipes={userRecipes} />
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