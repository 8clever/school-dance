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

    {/** facebook pixel */}
    <noscript>
      <img 
        height="1" 
        width="1"
        src="https://www.facebook.com/tr?id=640518363194829&ev=PageView&noscript=1"
      />
    </noscript>
  </>
)

ReactDOM.render(App, $el);

if (module["hot"]) {
  module["hot"].accept();
}

(window => {
  /** disable right click */
  window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  }, false);

  /** google analytics */
  function gtag(...args) {window.dataLayer.push(arguments);}
  window.dataLayer = window.dataLayer || [];
  gtag('js', new Date());
  gtag('config', 'UA-163129857-1');
  executeScript("https://www.googletagmanager.com/gtag/js?id=UA-163129857-1");

  /** yandex metrica */
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*(new Date() as any);k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  window.ym(61744756, "init", {clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});

  /** facebook pixel */
  (function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)})(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', '640518363194829');
  window.fbq('track', 'PageView');
})(window as any)
