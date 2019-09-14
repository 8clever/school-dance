import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div>Ну все, я готов к бою 2323</div>
  )
}

const $el = document.querySelector(".react-app") || document.createElement("div");
const $body = document.querySelector("body");

$el.className = "react-app";
$body.appendChild($el);

ReactDOM.render(<App />, $el);

if (module["hot"]) {
  module["hot"].accept();
}
