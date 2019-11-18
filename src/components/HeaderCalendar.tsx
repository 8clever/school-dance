import React from "react";
import { BigRow, BigButtonColMin } from "./Big";
import { Row, Col } from "reactstrap";
import { Direction } from "../../server/models/Direction";
import _ from "lodash";
import { routerStore } from "../store/RouterStore";
import { CalendarMini } from "./CalendarMini";

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

  React.useEffect(() => {
    setCalendarIsVisible(false);
    if (props.onClose) {
      props.onClose();
    }
  }, [routerStore.history.location.pathname])

  const calendar = (
    <CalendarMini 
      date={props.date}
      onChange={props.onChange}
      direction={props.direction}
    />
  )

  return (
    <>
      <BigRow>
        <BigButtonColMin
          selected={props.leftButtonActive}
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
          md={4}>
          РАСПИСАНИЕ
        </BigButtonColMin>
        <BigButtonColMin 
          selected={props.rightButtonActive}
          md={4}
          onClick={props.rightButtonOnClick}
          padding={"15px 0"} 
        >
          {props.rightButtonText}
        </BigButtonColMin>
      </BigRow>
      
      {
        calendarIsVisible ?
        <div className="d-md-none">
          {calendar}
        </div> : null
      }

      {
        calendarIsVisible ?
        <Row className="relative d-none d-md-block" noGutters>
          <Col 
            style={{
              zIndex: 1000
            }}
            className="absolute-container offset-md-4" 
            md={4}>
            {calendar}
          </Col>  
        </Row> : null
      }
    </>
  )
}