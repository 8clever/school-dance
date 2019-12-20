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
import _ from "lodash";

import leftSVG from "../images/icons/arrow-left.png";
import rightSVG from "../images/icons/arrow-right.png";
import { configStore } from "../store/ConfigStore";
import { userStore } from "../store/UserStore";
import { TimePicker } from "./CalendarDay";

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

export const stickyLeft: React.CSSProperties = {
  position: "sticky",
  zIndex: 1,
  left: 0,
  background: "white"
}

export const colOneOfNine: React.CSSProperties = {
  flex: `0 0 ${1/9*100}%`,
  maxWidth: `${1/9*100}%`
}

export const col7OfNine: React.CSSProperties = {
  flex: `0 0 ${7/9*100}%`,
  maxWidth: `${7/9*100}%`
}

export const CalendarWeek = observer((props: CalendarInnerProps) => {
  const { date, setDate } = props;
  const startDate = moment(date).startOf("isoWeek");
  const endDate = moment(date).endOf("isoWeek");

  const weekDays = getWeekDays(startDate.toDate());
  const times = getTimes(startDate.toDate());
  const selectedDirection = _.find(directionStore.itemList, _.matches({ _id: props.selectedDirectionId }));
  
  if (!configStore.item) return null;

  return (
    <BigRow>
      <BigButtonColMin
        style={{
          ...stickyLeft,
          ...colOneOfNine
        }}
        onClick={() => {
          const prev = startDate.clone().add(-1, "day").toDate();
          setDate(prev);
        }}>
        <img src={leftSVG} width={15} height={15} />
      </BigButtonColMin>
      <Col style={col7OfNine}>
        <FlexCol>
          {
            weekDays.map((week, idx) => {
              const isSameDay = moment().isSame(week.day, "day");
              return (
                <WeekDay key={idx}>
                  <Wrapper 
                    className="text-uppercase"
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
        style={colOneOfNine}
        onClick={() => {
          const next = endDate.clone().add(1, "day").toDate();
          setDate(next);
        }}>
        <img src={rightSVG} width={15} height={15} />
      </BigButtonColMin>
      {
        times.map((t, idx) => {
          if (!(
            idx >= configStore.item.calendarTimeRange.from && 
            idx <= configStore.item.calendarTimeRange.to
          )) return null;

          const isSameHour = t.time.format("HH") === moment().format("HH");

          return (
            <React.Fragment key={idx}>
              <BigButtonColMin
                style={{
                  ...stickyLeft,
                  ...colOneOfNine
                }}
                selected={isSameHour}>
                {t.time.format("HH:mm")}
              </BigButtonColMin>
              <Col style={col7OfNine}>
                <div style={{
                  display: "flex",
                  height: "100%",
                  justifyContent: "space-between"
                }}>
                  {
                    weekDays.map((week, idx) => {
                      const hour = t.time.toDate().getHours();
                      const time = week.day.clone().startOf("day").add(hour, "hour");
                      const schedules = findSchedulesByTime(
                        time, 
                        selectedDirection ? [selectedDirection] : directionStore.itemList
                      );
                      return (
                        <WeekDay
                          key={idx}
                          onClick={() => {
                            routerStore.push(`/calendar?type=${CALENDAR_DAY}&date=${moment(week.day).format("DD-MM-YYYY")}`)
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
                style={colOneOfNine}>
                {
                  userStore.isAdmin() &&
                  idx === configStore.item.calendarTimeRange.from ?
                  <TimePicker 
                    onClickPlus={() => {
                      configStore.item.calendarTimeRange.from += 1;
                      configStore.save();
                    }}
                    onClickMinus={() => {
                      configStore.item.calendarTimeRange.from -= 1;
                      configStore.save();
                    }}
                  /> : null
                }

                {
                  userStore.isAdmin() &&
                  idx === configStore.item.calendarTimeRange.to ?
                  <TimePicker 
                    onClickPlus={() => {
                      configStore.item.calendarTimeRange.to += 1;
                      configStore.save();
                    }}
                    onClickMinus={() => {
                      configStore.item.calendarTimeRange.to -= 1;
                      configStore.save();
                    }}
                  /> : null
                }
              </BigButtonColMin>
            </React.Fragment>
          )
        })
      }
    </BigRow>
  )
})