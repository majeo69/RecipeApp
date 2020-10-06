import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

import HomePage from './home-page/HomePage';
import ExplorePage from './explore-page/ExplorePage';
import UserRecipePage from './user-recipe-page/UserRecipePage';
import SignInSignUpPage from './signin-signup-page/SignInSignUpPage';
import CreateRecipePage from './create-recipe-page/CreateRecipePage';
import RecipePage from './recipe-page/RecipePage';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserToken } from '../redux/user/user.selectors';


const mapStateToProps = createStructuredSelector({
  currentUserToken: selectUserToken
});

function App({ currentUserToken }) {
  return (
    <div className="App">
      <div className='sticky-header'>
        <Header />
      </div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/explore' component={ExplorePage} />
        <Route exact path='/myrecipes' render={() => currentUserToken ? (<UserRecipePage />) : (<Redirect to='/signin' />)} />
        <Route exact path='/signin' render={() => currentUserToken ? (<Redirect to='/myrecipes' />) : (<SignInSignUpPage />)} />
        <Route exact path='/createrecipe' component={CreateRecipePage} />
        <Route path='/explore/:id' component={RecipePage} />
        <Route path='/myrecipes/:id' component={RecipePage} />
      </Switch>
      <Footer />
    </div>
  );
}


export default connect(mapStateToProps)(App);