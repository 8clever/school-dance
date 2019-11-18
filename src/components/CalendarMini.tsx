import React from "react";
import { Row, Col } from "reactstrap";
import moment from "moment";
import { getMonth } from "./CalendarMonth";
import leftPNG from "../images/icons/arrow-left.png";
import rightPNG from "../images/icons/arrow-right.png";
import { getTimes, findSchedulesByTime } from "./CalendarHelpers";
import _ from "lodash";
import { Direction } from "../../server/models/Direction";

interface CalendarMiniProps {
  date: Date;
  onChange: (date: Date) => void;
  direction?: Direction;
}

export const CalendarMini = (props: CalendarMiniProps) => {

  const month = getMonth(moment(props.date));

  return (
    <table className="calendar-mini">
      <tbody>
        <tr>
          <td colSpan={7}>
            <Row>
              <Col xs={2}>
                <img 
                  onClick={() => {
                    const date = moment(props.date).add(-1, "month");
                    props.onChange(date.toDate());
                  }}
                  className="control"
                  height={15} 
                  src={leftPNG} 
                />
              </Col>
              <Col xs={8}>
                <span className={"text-uppercase"}>
                  {moment(props.date).locale("ru").format("MMMM, YYYY")}
                </span>
              </Col>
              <Col xs={2}>
                <img 
                  onClick={() => {
                    const date = moment(props.date).add(1, "month");
                    props.onChange(date.toDate());
                  }}
                  className="control"
                  height={15} 
                  src={rightPNG} 
                />
              </Col>
            </Row>
          </td>
        </tr>
        <tr>
          <td>пн</td>
          <td>вт</td>
          <td>ср</td>
          <td>чт</td>
          <td>пт</td>
          <td>сб</td>
          <td>вс</td>
        </tr>
        {
          month.map((week, idx) => {
            return (
              <tr className="week" key={idx}>
                {
                  week.map((day, idx) => {
                    const times = getTimes(day.day.toDate());
                    let schedules = [];

                    if (props.direction) {
                      times.forEach((t) => {
                        const _schedules = findSchedulesByTime(t.time, [props.direction]);
                        if (!_schedules.length) return null;
                        schedules = _.unionBy(schedules, _schedules, "_id");
                      });
                    }

                    const isSameMonth = day.day.isSame(props.date, "month");
                    const className = [];

                    if (!isSameMonth) className.push("disabled");
                    if (schedules.length) className.push("active");

                    return (
                      <td 
                        className={className.join(" ")}
                        key={idx}>
                        {day.day.format("D")}
                      </td>
                    )
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}