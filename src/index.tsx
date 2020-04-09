import React from "react";
import ReactDOM from "react-dom";

import "./style/index.scss";

import { Router } from "./components/Router";
import { executeScript } from "./components/Widget";

const $el = document.querySelector(".react-app") || document.createElement("div");
const $body = document.querySelector("body");

$el.className = "react-app";
$body.appendChild($el);

const App = (
  <Router />
)

ReactDOM.render(App, $el);

if (module["hot"]) {
  module["hot"].accept();
}

interface WindowLocal extends Window {
  dataLayer?: IArguments[];
}

const windowLocal: WindowLocal = window;

windowLocal.dataLayer = windowLocal.dataLayer || [];
windowLocal.addEventListener('contextmenu', function (e) {
  e.preventDefault();
}, false);

function gtag(...args) {
  windowLocal.dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', 'UA-163129857-1');

executeScript("https://www.googletagmanager.com/gtag/js?id=UA-163129857-1")
