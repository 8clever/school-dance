import React from "react";
import { Route, Router as DOMRouter, Redirect, Switch } from "react-router-dom";
import { Home } from "../pages/Home";
import { routerStore } from "../store/RouterStore";
import { Direction } from "../pages/Direction";
import { Studio } from "../pages/Studio";
import { Teacher } from "../pages/Teacher";
import { Partners } from "../pages/Partners";
import { FirstVisit } from "../pages/FirstVisit";
import { Contacts } from "../pages/Contacts";
import { Leaders } from "../pages/Leaders";
import { Calendar } from "../pages/Calendar";
import { Auth } from "../pages/Auth";
import qs from "querystring";
import { userStore } from "../store/UserStore";
import { Search } from "../pages/Search";
import { ExternalSchedule } from "../pages/ExternalSchedule";
import { SignUp } from "../pages/SignUp";
import { Directions } from "../pages/Directions";
import { Admin } from "../pages/Admin";
import { Category } from "../pages/Category";
import { DirectionSection } from "../../server/models/Direction";
import { News } from "../pages/News";
import { Widget } from "./Widget";
import { Payment } from "../pages/Payment";
import { PayPal } from "../pages/PayPal";
import { CreditCard } from "../pages/CreditCard";
import { Services } from "../pages/Services";
import { PaymentSuccess } from "../pages/PaymentSuccess";
import { PaymentFail } from "../pages/PaymentFail";

const parse = (path: string) => {
  if (!path) return {};
  path = path.replace("?", "");
  return qs.parse(path) as any;
}

const FakeHome = () => (
  <>
    <Widget 
      elementId={"SiteWidgetMoyklass30104"}
      widgetId={"SMjP5R51qXy14ECnt9cbw5yvCiShSvlD9o"} 
    />

    <Widget
      elementId={"SiteWidgetMoyklass28435"}
      widgetId={"9wjFHbwc75jXR7mU10vPAY1RoXp4NIFoqg"}
    />
  </>
)

export const Router = () => {

  return (
    <DOMRouter history={routerStore.history}>
      <Switch>
        <Route exact path="/" render={() => <Home />}/>
        <Route exact path="/home" render={() => <FakeHome />} />
        <Route exact path="/admin" render={() => <Admin />} />
        <Route exact path="/category/:category" render={(match) => {
          return <Category section={match.match.params.category as DirectionSection} />
        }} 
        />
        <Route exact path="/directions" render={() => <Directions />}/> 
        <Route exact path="/directions/:id" render={(match) => <Direction id={match.match.params.id as string} />}/>
        <Route exact path="/directions/:id/:sub" render={(match) => 
          <Direction
            sub={match.match.params.sub as string}
            id={match.match.params.id as string} 
          />
        }/>
        <Route exact path="/studio" render={(match) => <Studio />}/>
        <Route exact path="/teachers" render={(match) => <Teacher />}/>
        <Route exact path="/teacher/:id" render={(match) => <Teacher id={match.match.params.id} />}/>
        <Route exact path="/partners" render={(match) => <Partners />}/>
        <Route exact path="/firstvisit" render={(match) => <FirstVisit />}/>
        <Route exact path="/contacts" render={(match) => <Contacts />}/>
        <Route exact path="/leaders" render={(match) => <Leaders />}/>
        <Route exact path="/leader/:id" render={(match) => <Leaders id={match.match.params.id} />}/>
        <Route exact path="/calendar" render={(match) => <Calendar {...parse(match.location.search)} />}/>
        <Route exact path="/auth" render={match => <Auth />} />
        <Route exact path="/search" render={match => <Search {...parse(match.location.search)} />} />
        <Route exact path="/external-schedule" render={() => <ExternalSchedule />} />
        <Route exact path="/signup" render={() => <SignUp />} />
        <Route exact path="/news" render={() => <News />} />
        <Route exact path="/news/:id" render={match => <News pieceOfNewsId={match.match.params.id} />} />
        <Route exact path="/services" render={() => <Services />} />
        <Route exact  path="/payment" render={() => <Payment /> }/>
        <Route exact  path="/payment/paypal" render={() => <PayPal /> }/>
        <Route exact  path="/payment/card" render={() => <CreditCard /> }/>
        <Route exact  path="/payment/success" render={() => <PaymentSuccess /> }/>
        <Route exact  path="/payment/fail" render={() => <PaymentFail /> }/>
        <Route exact path="/logout" render={() => {
          userStore.logout().then(() => {
            routerStore.push("/");
          });

          return null;
        }} />
        <Redirect to="/" />
      </Switch>
    </DOMRouter>
  )
}