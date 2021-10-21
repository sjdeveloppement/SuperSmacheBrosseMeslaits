import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UidContext } from './components/AppContext'; // pour stocker l'id utilisateur
import Account from './pages/Account';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import axios from 'axios';

const App = () => {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true
      })
        .then((res) => setUid(res.data))
        .catch((err) => console.log("No token"));
    };
    fetchToken();
  }, [uid]);
  return (
    <UidContext.Provider value={uid}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/account" exact component={Account} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </UidContext.Provider>
  );
};

export default App;
