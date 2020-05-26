import React from "react";
import { isMobile } from "../utils/isMobile";

interface WidgetProps {
  elementId: string;
  widgetId: string;
}

interface ExecuteScriptProps {
  src: string;
  id?: string;
  onload?: () => void;
  dataset?: DOMStringMap;
  once?: boolean;
  container?: HTMLElement;
}

const map = {};

export const executeScript = (props: ExecuteScriptProps) => {
  const $container = props.container || document.body;
  const onload = () => {
    map[props.src] = 1;
    const evt = new Event("DOMContentLoaded");
    document.dispatchEvent(evt);
    props.onload && props.onload();
  }

  if (props.once && map[props.src]) {
    onload();
    return;
  }

  const $script = document.createElement("script");
  $script.src = props.src;
  $script.id = props.id;
  Object.keys(props.dataset || {}).forEach(key => {
    $script.setAttribute(key, props.dataset[key]);
  });
  $script.onload = onload;
  $container.append($script);
}

export const useInlineScript = (str: string = "") => {
  React.useEffect(() => {
    const scripts = str.match(/<script[^<]+<\/script>/gm);
    if (!scripts) return;
    scripts.forEach(script => {
      const src = script.match(/src="[^"]+"/);
      if (!src) return;
      const url = src[0].replace(/src=/, "").replace(/"/gm, "");
      executeScript({ src: url });
    })
  }, [str, isMobile()])

  return []
}

export const Widget = (props: WidgetProps) => {

  React.useEffect(() => {
    executeScript({ src: `https://app.moyklass.com/api/site/widget/?id=${props.widgetId}` })
  }, []);

  return (
    <div id={props.elementId} />
  )
}