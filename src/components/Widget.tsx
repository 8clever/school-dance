import React from "react";

interface WidgetProps {
  elementId: string;
  widgetId: string;
}

export const executeScript = (
  src: string, 
  onload?: () => void,
  dataset?: DOMStringMap
) => {
  const $script = document.createElement("script");
    $script.src = src;
    Object.keys(dataset || {}).forEach(key => {
      $script.setAttribute(key, dataset[key]);
    });
    $script.onload = () => {
      const evt = new Event("DOMContentLoaded");
      document.dispatchEvent(evt);
      onload && onload();
    };
    document.body.append($script);
}

export const Widget = (props: WidgetProps) => {

  React.useEffect(() => {
    executeScript(`https://app.moyklass.com/api/site/widget/?id=${props.widgetId}`)
  }, []);

  return (
    <div id={props.elementId} />
  )
}