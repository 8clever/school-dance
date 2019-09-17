import React from "react";
import { Switch, Route, Router as DOMRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { routerStore } from "../store/RouterStore";
import { Direction } from "../pages/Home/Direction";


export const Router = () => {

  return (
    <DOMRouter history={routerStore.history}>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/directions/new" render={() => <Direction />} />
        <Route exact path="/directions/:id" render={(match) => <Direction id={match.match.params.id as string} />}/>
      </Switch>
    </DOMRouter>
  )
}