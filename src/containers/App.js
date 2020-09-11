import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import HomePage from './homepage/HomePage';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
      	<Route exact path='/' component={HomePage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;


