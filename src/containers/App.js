import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

import HomePage from './home-page/HomePage';
import ExplorePage from './explore-page/ExplorePage';
import UserPage from './users-page/UserPage';
import SignInPage from './signin-page/SignInPage';
import CreateRecipePage from './create-recipe-page/CreateRecipePage'


function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
      	<Route exact path='/' component={HomePage} />
        <Route path='/explore' component={ExplorePage} />
        <Route path='/myrecipes' component={UserPage} />
        <Route path='/signin' component={SignInPage} />
        <Route path='/create' component={CreateRecipePage} />
      </Switch>
      <Footer />
    </div>
  );
}


export default App;