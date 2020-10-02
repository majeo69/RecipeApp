import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

import HomePage from './home-page/HomePage';
import ExplorePage from './explore-page/ExplorePage';
import UserRecipePage from './user-recipe-page/UserRecipePage';
import SignInSignUpPage from './signin-signup-page/SignInSignUpPage';
import CreateRecipePage from './create-recipe-page/CreateRecipePage'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserToken } from '../redux/user/user.selectors';


const mapStateToProps = createStructuredSelector({
  currentUserToken: selectUserToken
});

function App({ currentUserToken }) {
  return (
    <div className="App">
      <Header />
      <Switch>
      	<Route exact path='/' component={HomePage} />
        <Route path='/explore' component={ExplorePage} />
        <Route path='/myrecipes' component={UserRecipePage} />
        <Route path='/signin' render={() => currentUserToken ? (<Redirect to='/myrecipes' />) : (<SignInSignUpPage />)} />
        <Route path='/create' component={CreateRecipePage} />
      </Switch>
      <Footer />
    </div>
  );
}


export default connect(mapStateToProps)(App);