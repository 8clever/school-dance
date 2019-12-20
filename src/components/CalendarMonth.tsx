import React from "react";
import { CalendarInnerProps, getWeekDays, LOCALE, WeekDayItem, getTimes, findSchedulesByTime, CALENDAR_DAY } from "./CalendarHelpers";
import moment, { Moment } from "moment";
import { BigRow, BigButtonColMin, BigHr } from "./Big";
import { Col } from "reactstrap";
import { FlexCol } from "./Flex";
import { WeekDay, colOneOfNine, col7OfNine } from "./CalendarWeek";
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
  const selectedDirection = _.find(directionStore.itemList, _.matches({ _id: props.selectedDirectionId }));

  return (
    <>
      <BigRow>
        <BigButtonColMin 
          style={colOneOfNine}
          onClick={() => {
            const prev = moment(date).startOf("month").add(-1, "day").toDate();
            setDate(prev);
          }}>
          <img src={leftSVG} width={15} height={15} />
        </BigButtonColMin>
        <Col style={col7OfNine}>
          <FlexCol>
            {
              month[0].map((week, idx) => {
                return (
                  <WeekDay key={idx}>
                    <DayWrapper 
                      className="text-uppercase"
                      idx={0} length={0}>
                      {week.day.locale(LOCALE).format("ddd")}
                    </DayWrapper>
                  </WeekDay>
                )
              })
            }
          </FlexCol>
        </Col>
        <BigButtonColMin 
          style={colOneOfNine}
          onClick={() => {
            const next = moment(date).endOf("month").add(1, "day").toDate();
            setDate(next);
          }}>
          <img src={rightSVG} width={15} height={15} />
        </BigButtonColMin>
        {
          month.map((m, idx) => {
            return (
              <React.Fragment key={idx}>
                <BigButtonColMin style={colOneOfNine} />
                <Col style={col7OfNine}>
                  <FlexCol>
                    {
                      m.map((week, idx) => {
                        const times = getTimes(week.day.toDate());
                        let directions = [];
                        times.forEach((t) => {
                          const _directions = findSchedulesByTime(
                            t.time, 
                            selectedDirection ? [selectedDirection] : directionStore.itemList
                          );
                          if (!_directions.length) return null;
                          directions = _.unionBy(directions, _directions, "_id");
                        });

                        const isCurrentDay = moment().isSame(week.day, "day");

                        return (
                          <WeekDay 
                            onClick={() => {
                              routerStore.push(`/calendar?type=${CALENDAR_DAY}&date=${week.day.format("DD-MM-YYYY")}`)
                            }}
                            key={idx}>
                            <DayWrapper
                              selected={selectedDirection ? !!directions.length : isCurrentDay} 
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
                <BigButtonColMin style={colOneOfNine} />
              </React.Fragment>
            )
          })
        }
      </BigRow>
      <BigHr className="d-none d-md-block" />
    </>
  )
})