import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import Welcome from './components/Welcome'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome}></Route>
        <Route path="/home" component={Home}></Route>
      </Switch>
  </Router>
  );
}

export default App;
