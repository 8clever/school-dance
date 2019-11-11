import React from "react";
import { CalendarInnerProps, getWeekDays, LOCALE, WeekDayItem, getTimes, findSchedulesByTime, CALENDAR_DAY } from "./CalendarHelpers";
import moment, { Moment } from "moment";
import { BigRow, BigButtonColMin } from "./Big";
import { Col } from "reactstrap";
import { FlexCol } from "./Flex";
import { WeekDay } from "./CalendarWeek";
import { Wrapper as DayWrapper } from "./Schedules";
import { directionStore } from "../store/DirectionStore";
import _ from "lodash";
import { routerStore } from "../store/RouterStore";
import { observer } from "mobx-react-lite";

import leftSVG from "../images/icons/arrow-left.png";
import rightSVG from "../images/icons/arrow-right.png";

export const getMonth = (date: Moment) => {
  const start = date.clone().startOf("month").startOf("isoWeek");
  const end = date.clone().endOf("month").endOf("isoWeek");
  const month: WeekDayItem[][] = [];
  let n = start.clone();
  while (n.isSameOrBefore(end)) {
    const week = getWeekDays(n.toDate());
    month.push(week);
    n.add(7, "day");
  }
  return month;
}

export const CalendarMonth = observer((props: CalendarInnerProps) => {
  const { date, setDate } = props;
  const month = getMonth(moment(date));

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
                  <DayWrapper idx={0} length={0}>
                    {week.day.locale(LOCALE).format("ddd")}
                  </DayWrapper>
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
                      let schedules = [];
                      times.forEach((t) => {
                        const _schedules = findSchedulesByTime(t.time, directionStore.itemList);
                        if (!_schedules.length) return null;
                        schedules = _.unionBy(schedules, _schedules, "_id");
                      });

                      const isCurrentMonth = moment().isSame(week.day, "day");
                      const existSelectedSchedule = _.find(schedules, _.matches({ _id: props.selectedDirectionId }));

                      return (
                        <WeekDay 
                          onClick={() => {
                            routerStore.push(`/calendar?type=${CALENDAR_DAY}&date=${week.day.format("DD-MM-YYYY")}`)
                          }}
                          key={idx}>
                          <DayWrapper
                            selected={isCurrentMonth || existSelectedSchedule} 
                            length={0}
                            idx={0}
                            disabled={!week.day.isSame(props.date, "month")}
                          >
                            {week.day.format("DD")}
                          </DayWrapper>
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