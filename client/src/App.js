import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './components/home';
import Landing from './components/landing';
import CreateVideogame from './components/createGame';
import GameDetail from './components/gameDetail';

function App() {


  return (
    <div className="App">
    <Switch>
      <Route exact path="/" component={Landing}></Route>
      <Route exact path="/videogames" component={Home}></Route>
      <Route path="/videogame/:id" component={GameDetail}></Route>
      <Route path="/create" component={CreateVideogame}></Route>
      </Switch>
    </div>
  );
}

export default App;
