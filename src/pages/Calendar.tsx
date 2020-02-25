import React from "react";
import { observer } from "mobx-react-lite";
import { Widget } from "../components/Widget";
import { Base } from "../components";
import { PageBreadcrumbs } from "../components/PageTitle";

interface CalendarProps {}

export const Calendar = observer((props: CalendarProps) => {
  return (
    <Base>

      <PageBreadcrumbs 
        items={[
          {
            title: "Расписание"
          }
        ]}
      />

      <Widget
        elementId={"SiteWidgetMoyklass28435"}
        widgetId={"9wjFHbwc75jXR7mU10vPAY1RoXp4NIFoqg"}
      />

      <Widget 
        elementId={"SiteWidgetMoyklass30104"}
        widgetId={"SMjP5R51qXy14ECnt9cbw5yvCiShSvlD9o"}
      />
    </Base>
  )
})