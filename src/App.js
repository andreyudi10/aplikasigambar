import React,{ useState } from 'react';
import Home from './pages/Home';
import DetailGambar from './pages/DetailGambar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {  

  return (
    <Router>
      <Switch>
        <Route path="/:id">
          <DetailGambar />
        </Route>
        <Route exact path="/" >
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
