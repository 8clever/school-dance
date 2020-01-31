import React from "react";

interface WidgetProps {
  elementId: string;
  widgetId: string;
}

export const Widget = (props: WidgetProps) => {

  React.useEffect(() => {
    const $script = document.createElement("script");
    $script.src = `https://app.moyklass.com/api/site/widget/?id=${props.widgetId}`;
    $script.onload = () => {
      (window as any).WdgMoyklass[props.widgetId].init();
    }
    document.body.append($script);
  }, []);

  return (
    <div id={props.elementId} />
  )
}