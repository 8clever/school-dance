import React from "react";
import { BigRow, BigButtonColMin, BigCol } from "./Big";
import moment from "moment";
import { LOCALE, findSchedulesByTime, getTimes, CalendarInnerProps, findEventsByTime } from "./CalendarHelpers";
import { FlexCol } from "./Flex";
import { directionStore } from "../store/DirectionStore";
import { Schedules } from "./Schedules";
import { eventStore } from "../store/EventStore";
import { observer } from "mobx-react-lite";
import { performanceStore } from "../store/PerformanceStore";

import leftSVG from "../images/icons/arrow-left.png";
import rightSVG from "../images/icons/arrow-right.png";

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
        <img src={leftSVG} width={15} height={15} />
      </BigButtonColMin>
      <BigButtonColMin 
        md={10}>
        <div style={{ 
          fontWeight: (
            moment().isSame(date, "day") ?
            600 :
            300
          ) 
        }}>
          {moment(date).locale(LOCALE).format("ddd")}
          {" "}
          {moment(date).locale(LOCALE).format("DD")}
        </div>
      </BigButtonColMin>
      <BigButtonColMin 
        onClick={() => {
          const next = moment(date).add(1, "day").toDate();
          setDate(next);
        }}
        bottom={0}
        md={1}>
        <img src={rightSVG} width={15} height={15} />
      </BigButtonColMin>
      {
        times.map((t, idx) => {
          if (!(idx > 6 && idx < 23)) return null;

          const schedules = [
            ...findSchedulesByTime(t.time, directionStore.itemList),
            ...findEventsByTime(t.time, eventStore.eventList, performanceStore.itemList)
          ]

          const isCurrentHour = t.time.format("HH") === moment().format("HH");

          return (
            <React.Fragment key={idx}>
              <BigButtonColMin
                top={0}
                bottom={0}
                md={1}>
                <div style={{
                  fontWeight: isCurrentHour ? 600 : 300
                }}>
                  {t.time.format("HH:mm")}
                </div>
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