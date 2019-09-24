import React from "react";
import { Route, Router as DOMRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { routerStore } from "../store/RouterStore";
import { Direction } from "../pages/Direction";
import { Performance } from "../pages/Performance";
import { Studio } from "../pages/Studio";
import { Teacher } from "../pages/Teacher";
import { Partners } from "../pages/Partners";
import { AnimatedSwitch } from 'react-router-transition';
import { FirstVisit } from "../pages/FirstVisit";
import { Contacts } from "../pages/Contacts";
import { Leaders } from "../pages/Leaders";
import { Subscribe } from "../pages/Subscribe";
import { Prices } from "../pages/Prices";

export const Router = () => {

  return (
    <DOMRouter history={routerStore.history}>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/directions/:id" render={(match) => <Direction id={match.match.params.id as string} />}/>
        <Route exact path="/events/:id" render={(match) => <Performance id={match.match.params.id as string} />}/>
        <Route exact path="/studio" render={(match) => <Studio />}/>
        <Route exact path="/teachers" render={(match) => <Teacher />}/>
        <Route exact path="/teacher/:id" render={(match) => <Teacher id={match.match.params.id} />}/>
        <Route exact path="/partners" render={(match) => <Partners />}/>
        <Route exact path="/firstvisit" render={(match) => <FirstVisit />}/>
        <Route exact path="/contacts" render={(match) => <Contacts />}/>
        <Route exact path="/leaders" render={(match) => <Leaders />}/>
        <Route exact path="/leader/:id" render={(match) => <Leaders id={match.match.params.id} />}/>
        <Route exact path="/subscribe" render={(match) => <Subscribe />}/>
        <Route exact path="/subscribe/:id" render={(match) => <Prices id={match.match.params.id} />}/>
      </AnimatedSwitch>
    </DOMRouter>
  )
}