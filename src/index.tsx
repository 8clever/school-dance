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
  <>
    <Router />

    {/** yandex metrica noscript */}
    <noscript>
      <div>
        <img 
          src="https://mc.yandex.ru/watch/61744756" 
          style={{
            position: "absolute",
            left: -9999
          }} 
        />
      </div>
    </noscript>
  </>
)

ReactDOM.render(App, $el);

if (module["hot"]) {
  module["hot"].accept();
}

interface WindowLocal extends Window {
  dataLayer?: IArguments[];
  ym?: (...args) => void;
}

const windowLocal: WindowLocal = window;

/** disable right click */
windowLocal.addEventListener('contextmenu', function (e) {
  e.preventDefault();
}, false);

/** google analytics */
function gtag(...args) {
  windowLocal.dataLayer.push(arguments);
}

windowLocal.dataLayer = windowLocal.dataLayer || [];
gtag('js', new Date());
gtag('config', 'UA-163129857-1');
executeScript("https://www.googletagmanager.com/gtag/js?id=UA-163129857-1");

/** yandex metrica */
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*(new Date() as any);k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
windowLocal.ym(61744756, "init", {clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});