import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from'./pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route component={NotFound}/>
    </Switch>
    </BrowserRouter>
  );
};

export default App;
