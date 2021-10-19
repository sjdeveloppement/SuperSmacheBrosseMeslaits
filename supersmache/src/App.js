import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Account from './pages/Account';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from'./pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/account" exact component={Account} />
      <Route component={NotFound}/>
    </Switch>
    </BrowserRouter>
  );
};

export default App;
