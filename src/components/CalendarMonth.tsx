import React from "react";
import { CalendarInnerProps, getWeekDays, LOCALE, WeekDayItem, getTimes, findSchedulesByTime, CALENDAR_DAY, findEventsByTime } from "./CalendarHelpers";
import moment from "moment";
import { BigRow, BigButtonColMin } from "./Big";
import { Col } from "reactstrap";
import { FlexCol } from "./Flex";
import { WeekDay } from "./CalendarWeek";
import { Wrapper as DayWrapper } from "./Schedules";
import { directionStore } from "../store/DirectionStore";
import _ from "lodash";
import { routerStore } from "../store/RouterStore";
import { eventStore } from "../store/EventStore";
import { performanceStore } from "../store/PerformanceStore";
import { observer } from "mobx-react-lite";

import leftSVG from "../images/icons/arrow-left.svg";
import rightSVG from "../images/icons/arrow-right.svg";

export const CalendarMonth = observer((props: CalendarInnerProps) => {
  const { date, setDate } = props;
  const startDate = moment(date).startOf("month").startOf("isoWeek");
  const endDate = moment(date).endOf("month").endOf("isoWeek");
  let n = startDate.clone();
  const month: WeekDayItem[][] = [];

  React.useEffect(() => {
    eventStore.loadEventList({
      dt: {
        $gte: startDate,
        $lte: endDate
      }
    });
  }, [ date ]);

  while (n.isSameOrBefore(endDate)) {
    const week = getWeekDays(n.toDate());
    month.push(week);
    n.add(7, "day");
  }

  return (
    <BigRow>
      <BigButtonColMin 
        onClick={() => {
          const prev = moment(date).startOf("month").add(-1, "day").toDate();
          setDate(prev);
        }}
        bottom={0}
        md={1}>
        <img src={leftSVG} width={15} height={15} />
      </BigButtonColMin>
      <Col md={10}>
        <FlexCol>
          {
            month[0].map((week, idx) => {
              return (
                <WeekDay key={idx}>
                  {week.day.locale(LOCALE).format("ddd")}
                </WeekDay>
              )
            })
          }
        </FlexCol>
      </Col>
      <BigButtonColMin 
        onClick={() => {
          const next = moment(date).endOf("month").add(1, "day").toDate();
          setDate(next);
        }}
        bottom={0}
        md={1}>
        <img src={rightSVG} width={15} height={15} />
      </BigButtonColMin>
      {
        month.map((m, idx) => {
          return (
            <React.Fragment key={idx}>
              <BigButtonColMin top={0} bottom={0} md={1} />
              <Col md={10}>
                <FlexCol>
                  {
                    m.map((week, idx) => {
                      const times = getTimes(week.day.toDate());
                      const schedulesByTime = _.compact(times.map((t) => {
                        const schedules = [
                          ...findSchedulesByTime(t.time, directionStore.directions),
                          ...findEventsByTime(t.time, eventStore.eventList, performanceStore.itemList)
                        ]
                        if (!schedules.length) return null;
                        return schedules;
                      }));

                      return (
                        <WeekDay 
                          onClick={() => {
                            routerStore.push(`/calendar?type=${CALENDAR_DAY}&date=${week.day.format("DD-MM-YYYY")}`)
                          }}
                          key={idx}>
                          <FlexCol align="center" justify="center">
                            <DayWrapper 
                              idx={schedulesByTime.length ? 1 : null}
                              disabled={!week.day.isSame(props.date, "month")}
                            >
                              {week.day.format("DD")}
                            </DayWrapper>
                          </FlexCol>
                        </WeekDay>
                      )
                    })
                  }
                </FlexCol>
              </Col>
              <BigButtonColMin top={0} bottom={0} md={1} />
            </React.Fragment>
          )
        })
      }
    </BigRow>
  )
})