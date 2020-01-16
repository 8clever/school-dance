import React from "react";
import { Base } from "../components";

export const ExternalSchedule = () => {

  React.useEffect(() => {
    const widgetId = "9wjFHbwc75jXR7mU10vPAY1RoXp4NIFoqg";
    const $script = document.createElement("script");
    $script.src = `https://app.moyklass.com/api/site/widget/?id=${widgetId}`;
    $script.onload = () => {
      (window as any).WdgMoyklass[widgetId].init();
    }
    document.body.append($script);
  }, [])

  return (
    <Base>
      <div id="SiteWidgetMoyklass28435" />
    </Base>
  )
}