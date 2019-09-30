import React from "react";
import { BigRow, BigButtonColMin, BigCol } from "./Big";
import moment from "moment";
import { Icon } from "./Icon";
import { LOCALE, findSchedulesByTime, getTimes, CalendarInnerProps, findEventsByTime } from "./CalendarHelpers";
import { FlexCol } from "./Flex";
import { directionStore } from "../store/DirectionStore";
import { Schedules } from "./Schedules";
import { eventStore } from "../store/EventStore";
import { observer } from "mobx-react-lite";
import { performanceStore } from "../store/PerformanceStore";

export const CalendarDay = observer((props: CalendarInnerProps) => {
  const { date, setDate } = props;
  const times = getTimes(date);

  React.useEffect(() => {
    const start = moment(date).startOf("date");
    const end = moment(date).endOf("date");
    eventStore.loadEventList({
      dt: {
        $gte: start,
        $lte: end
      }
    });
  }, [ date ]);

  return (
    <BigRow>
      <BigButtonColMin 
        onClick={() => {
          const prev = moment(date).add(-1, "day").toDate();
          setDate(prev);
        }}
        bottom={0}
        md={1}>
        <Icon type="chevron-left" />
      </BigButtonColMin>
      <BigButtonColMin md={10}>
        {moment(date).locale(LOCALE).format("ddd")}
        {" "}
        {moment(date).locale(LOCALE).format("DD")}
      </BigButtonColMin>
      <BigButtonColMin 
        onClick={() => {
          const next = moment(date).add(1, "day").toDate();
          setDate(next);
        }}
        bottom={0}
        md={1}>
        <Icon type="chevron-right" />
      </BigButtonColMin>
      {
        times.map((t, idx) => {
          if (!(idx > 6 && idx < 23)) return null;

          const schedules = [
            ...findSchedulesByTime(t.time, directionStore.directions),
            ...findEventsByTime(t.time, eventStore.eventList, performanceStore.itemList)
          ]

          return (
            <React.Fragment key={idx}>
              <BigButtonColMin
                top={0}
                bottom={0}
                md={1}>
                {t.time.format("HH:mm")}
              </BigButtonColMin>
              <BigCol md={10}>
                <FlexCol align="center" justify="center">
                  <Schedules 
                    isDay={true}
                    items={schedules} 
                  />
                </FlexCol>
              </BigCol>
              <BigButtonColMin 
                top={0}
                bottom={0}
                md={1}>
                &nbsp;
              </BigButtonColMin>
            </React.Fragment>
          )
        })
      }
    </BigRow>
  )
})