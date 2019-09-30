import React from "react";
import { CalendarInnerProps, getTimes, LOCALE, getWeekDays, findSchedulesByTime, CALENDAR_DAY } from "./CalendarHelpers";
import { BigRow, BigButtonColMin, BigButtonCellProps } from "./Big";
import moment from "moment";
import { Icon } from "./Icon";
import { Col } from "reactstrap";
import { FlexCol } from "./Flex";
import { directionStore } from "../store/DirectionStore";
import { Schedules } from "./Schedules";
import { routerStore } from "../store/RouterStore";

export const WeekDay = (props: BigButtonCellProps) => {
  const size = 100 / 7;
  return (
    <BigButtonColMin
      block
      colPadding="0px"
      padding={"0px"}
      flex={`0 0 ${size}%`} 
      maxWidth={`${size}%`}
      {...props}
    />
  )
}

export const CalendarWeek = (props: CalendarInnerProps) => {
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
        <Icon type="chevron-left" />
      </BigButtonColMin>
      <Col md={10}>
        <FlexCol>
          {
            weekDays.map((week, idx) => {
              return (
                <WeekDay key={idx}>
                  {week.day.locale(LOCALE).format("ddd")}
                  {" "}
                  {week.day.locale(LOCALE).format("DD")}
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
        <Icon type="chevron-right" />
      </BigButtonColMin>
      {
        times.map((t, idx) => {
          if (!(idx > 6 && idx < 23)) return null;

          return (
            <React.Fragment key={idx}>
              <BigButtonColMin
                top={0}
                bottom={0}
                md={1}>
                {t.time.format("HH:mm")}
              </BigButtonColMin>
              <Col md={10}>
                <FlexCol>
                  {
                    weekDays.map((week, idx) => {
                      const hour = t.time.toDate().getHours();
                      const time = week.day.clone().startOf("day").add(hour, "hour");
                      const schedules = findSchedulesByTime(time, directionStore.directions);
                      return (
                        <WeekDay 
                          onClick={() => {
                            routerStore.push(`/calendar?type=${CALENDAR_DAY}&date=${moment(date).format("DD-MM-YYYY")}`)
                          }}
                          key={idx}>
                          <FlexCol align="center" justify="center">
                            <Schedules items={schedules} />
                          </FlexCol>
                        </WeekDay>
                      )
                    })
                  }
                </FlexCol>
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
}