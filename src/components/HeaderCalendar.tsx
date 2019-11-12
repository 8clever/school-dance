import React from "react";
import { BigRow, BigButtonColMin } from "./Big";
import { Row, Col } from "reactstrap";
import { getMonth } from "./CalendarMonth";
import moment from "moment";

import leftPNG from "../images/icons/arrow-left.png";
import rightPNG from "../images/icons/arrow-right.png";
import { getTimes, findSchedulesByTime } from "./CalendarHelpers";
import { Direction } from "../../server/models/Direction";
import _ from "lodash";
import { routerStore } from "../store/RouterStore";

interface HeaderCalendarProps {
  date: Date;
  onChange: (date: Date) => void;
  leftButtonActive?: boolean;
  leftButtonText: string;
  leftButtonOnClick?: () => void;
  rightButtonActive?: boolean;
  rightButtonText: string;
  rightButtonOnClick?: () => void;
  direction: Direction;
  onClose?: () => void;
}

export const HeaderCalendar = (props: HeaderCalendarProps) => {
  const [ calendarIsVisible, setCalendarIsVisible ] = React.useState(false);
  const month = getMonth(moment(props.date));

  React.useEffect(() => {
    setCalendarIsVisible(false);
    if (props.onClose) {
      props.onClose();
    }
  }, [routerStore.history.location.pathname])

  return (
    <>
      <BigRow>
        <BigButtonColMin
          selected={props.leftButtonActive}
          xs={6}
          md={4}
          padding={"15px 0"} 
          onClick={props.leftButtonOnClick}>
          {props.leftButtonText}
        </BigButtonColMin>
        <BigButtonColMin 
          onClick={() => {
            if (calendarIsVisible && props.onClose) {
              props.onClose();
            }
            setCalendarIsVisible(!calendarIsVisible)
          }}
          selected={calendarIsVisible}
          md={4} 
          xs={6}>
          РАСПИСАНИЕ
        </BigButtonColMin>
        <BigButtonColMin 
          selected={props.rightButtonActive}
          xs={6}
          md={4}
          onClick={props.rightButtonOnClick}
          className="d-none d-md-block" 
          padding={"15px 0"} 
        >
          {props.rightButtonText}
        </BigButtonColMin>
      </BigRow>

      {
        calendarIsVisible ?
        <Row className="relative" noGutters>
          <Col 
            style={{
              zIndex: 1000
            }}
            className="absolute-container offset-md-4" 
            md={4}>

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

                            times.forEach((t) => {
                              const _schedules = findSchedulesByTime(t.time, [props.direction]);
                              if (!_schedules.length) return null;
                              schedules = _.unionBy(schedules, _schedules, "_id");
                            });

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
          </Col>  
        </Row> : null
      }
    </>
  )
}