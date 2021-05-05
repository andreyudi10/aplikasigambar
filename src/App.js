import React,{ useState } from 'react';
import Home from './pages/Home';
import DetailGambar from './pages/DetailGambar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Favourite from './pages/Favourite';


function App() {  

  return (
    <Router>
      <Switch>
        <Route path="/details/:id">
          <DetailGambar />
        </Route>
        <Route path="/favourite">
          <Favourite />
        </Route>
        <Route exact path="/" >
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
