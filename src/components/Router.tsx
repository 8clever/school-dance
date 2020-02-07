import React from "react";
import { Route, Router as DOMRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { routerStore } from "../store/RouterStore";
import { Direction } from "../pages/Direction";
import { Performance } from "../pages/Performance";
import { Studio } from "../pages/Studio";
import { Teacher } from "../pages/Teacher";
import { Partners } from "../pages/Partners";
import { FirstVisit } from "../pages/FirstVisit";
import { Contacts } from "../pages/Contacts";
import { Leaders } from "../pages/Leaders";
import { Subscribe } from "../pages/Subscribe";
import { Prices } from "../pages/Prices";
import { Calendar } from "../pages/Calendar";
import { Auth } from "../pages/Auth";
import qs from "querystring";
import { userStore } from "../store/UserStore";
import { Search } from "../pages/Search";
import { Artists } from "../pages/Artists";
import { Classes } from "../pages/Classes";
import { ExternalSchedule } from "../pages/ExternalSchedule";
import { SignUp } from "../pages/SignUp";
import { Widget } from "./Widget";

const parse = (path: string) => {
  if (!path) return {};
  path = path.replace("?", "");
  return qs.parse(path) as any;
}

export const Router = () => {

  return (
    <DOMRouter history={routerStore.history}>
      <Route exact path="/" render={() => <Widget 
        elementId={"SiteWidgetMoyklass28435"}
        widgetId={"9wjFHbwc75jXR7mU10vPAY1RoXp4NIFoqg"}
      />} />
      <Route exact path="/home" render={() => <Home />} />
      <Route exact path="/directions/:id" render={(match) => <Direction id={match.match.params.id as string} />}/>
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
      <Route exact path="/calendar" render={(match) => <Calendar {...parse(match.location.search)} />}/>
      <Route exact path="/auth" render={match => <Auth />} />
      <Route exact path="/search" render={match => <Search {...parse(match.location.search)} />} />
      <Route exact path="/artists" render={match => <Artists />} />
      <Route exact path="/performance" render={match => <Performance />} />
      <Route exact path="/classes" render={match => <Classes />} />
      <Route exact path="/external-schedule" render={() => <ExternalSchedule />} />
      <Route exact path="/signup" render={() => <SignUp />} />
      
      <Route exact path="/logout" render={() => {
        userStore.logout().then(() => {
          routerStore.push("/");
        });

        return null;
      }} />
    </DOMRouter>
  )
}