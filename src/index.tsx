import React from "react";
import ReactDOM from "react-dom";

import "./style/index.scss";

import { Home } from "./pages/Home";

const $el = document.querySelector(".react-app") || document.createElement("div");
const $body = document.querySelector("body");

$el.className = "react-app";
$body.appendChild($el);

ReactDOM.render(<Home />, $el);

if (module["hot"]) {
  module["hot"].accept();
}
