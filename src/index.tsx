import React from "react";
import ReactDOM from "react-dom";

import "./style/index.scss";

import { Router } from "./components/Router";

const $el = document.querySelector(".react-app") || document.createElement("div");
const $body = document.querySelector("body");

$el.className = "react-app";
$body.appendChild($el);

ReactDOM.render(<Router />, $el);

if (module["hot"]) {
  module["hot"].accept();
}

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
}, false);
