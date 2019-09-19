import React from "react";
import { Switch, Route, Router as DOMRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { routerStore } from "../store/RouterStore";
import { Direction } from "../pages/Direction";
import { Performance } from "../pages/Performance";

export const Router = () => {

  return (
    <DOMRouter history={routerStore.history}>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/directions/:id" render={(match) => <Direction id={match.match.params.id as string} />}/>
        <Route exact path="/events/:id" render={(match) => <Performance id={match.match.params.id as string} />}/>
      </Switch>
    </DOMRouter>
  )
}