import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import HomePage from './home-page/HomePage';
import SignInPage from './signin-page/SignInPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
      	<Route exact path='/' component={HomePage} />
        <Route path='/signin' component={SignInPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;


