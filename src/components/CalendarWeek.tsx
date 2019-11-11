import React from "react";
import { CalendarInnerProps, getTimes, LOCALE, getWeekDays, findSchedulesByTime, CALENDAR_DAY } from "./CalendarHelpers";
import { BigRow, BigButtonColMin, getShadowBoxStyle } from "./Big";
import moment from "moment";
import { Col } from "reactstrap";
import { FlexCol } from "./Flex";
import { directionStore } from "../store/DirectionStore";
import { Schedules, Wrapper } from "./Schedules";
import { routerStore } from "../store/RouterStore";
import { observer } from "mobx-react-lite";

import leftSVG from "../images/icons/arrow-left.png";
import rightSVG from "../images/icons/arrow-right.png";

interface WeekDayProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export const WeekDay = (props: WeekDayProps) => {
  return (
    <div 
      onClick={props.onClick}
      style={{
        ...getShadowBoxStyle({}),
        cursor: "pointer",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        minHeight: 65
      }}>
      {props.children}
    </div>
  )
}

export const CalendarWeek = observer((props: CalendarInnerProps) => {
  const { date, setDate } = props;
  const startDate = moment(date).startOf("isoWeek");
  const endDate = moment(date).endOf("isoWeek");

  const weekDays = getWeekDays(startDate.toDate());
  const times = getTimes(startDate.toDate());
  
  return (
    <BigRow>
      <BigButtonColMin 
        onClick={() => {
          const prev = startDate.clone().add(-1, "day").toDate();
          setDate(prev);
        }}
        bottom={0}
        md={1}>
        <img src={leftSVG} width={15} height={15} />
      </BigButtonColMin>
      <Col md={10}>
        <FlexCol>
          {
            weekDays.map((week, idx) => {
              const isSameDay = moment().isSame(week.day, "day");
              return (
                <WeekDay key={idx}>
                  <Wrapper 
                    selected={isSameDay}
                    idx={0} 
                    length={0}>
                    {week.day.locale(LOCALE).format("ddd")}
                    {" "}
                    {week.day.locale(LOCALE).format("DD")}
                  </Wrapper>
                </WeekDay>
              )
            })
          }
        </FlexCol>
      </Col>
      <BigButtonColMin 
        onClick={() => {
          const next = endDate.clone().add(1, "day").toDate();
          setDate(next);
        }}
        bottom={0}
        md={1}>
        <img src={rightSVG} width={15} height={15} />
      </BigButtonColMin>
      {
        times.map((t, idx) => {
          if (!(idx > 6 && idx < 23)) return null;

          const isSameHour = t.time.format("HH") === moment().format("HH");

          return (
            <React.Fragment key={idx}>
              <BigButtonColMin
                selected={isSameHour}
                top={0}
                bottom={0}
                md={1}>
                {t.time.format("HH:mm")}
              </BigButtonColMin>
              <Col md={10}>
                <div style={{
                  display: "flex",
                  height: "100%",
                  justifyContent: "space-between"
                }}>
                  {
                    weekDays.map((week, idx) => {
                      const hour = t.time.toDate().getHours();
                      const time = week.day.clone().startOf("day").add(hour, "hour");
                      const schedules = findSchedulesByTime(time, directionStore.itemList);
                      return (
                        <WeekDay
                          key={idx}
                          onClick={() => {
                            routerStore.push(`/calendar?type=${CALENDAR_DAY}&date=${moment(date).format("DD-MM-YYYY")}`)
                          }}
                        >
                          <Schedules items={schedules} />
                        </WeekDay>
                      )
                    })
                  }
                </div>
              </Col>
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