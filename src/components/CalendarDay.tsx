import React from "react";
import { BigRow, BigButtonColMin, BigCol } from "./Big";
import moment from "moment";
import { LOCALE, findSchedulesByTime, getTimes, CalendarInnerProps } from "./CalendarHelpers";
import { FlexCol } from "./Flex";
import { directionStore } from "../store/DirectionStore";
import { Schedules } from "./Schedules";
import { observer } from "mobx-react-lite";
import _ from "lodash";

import leftSVG from "../images/icons/arrow-left.png";
import rightSVG from "../images/icons/arrow-right.png";

export const CalendarDay = observer((props: CalendarInnerProps) => {
  const { date, setDate } = props;
  const times = getTimes(date);
  const selectedDirection = _.find(directionStore.itemList, _.matches({ _id: props.selectedDirectionId }));

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
        selected={moment().isSame(date, "day")}
        md={10}>
        {moment(date).locale(LOCALE).format("ddd")}
        {" "}
        {moment(date).locale(LOCALE).format("DD")}
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

          const directions = findSchedulesByTime(
            t.time, 
            selectedDirection ? [selectedDirection] : directionStore.itemList
          );
          const isCurrentHour = t.time.format("HH") === moment().format("HH");

          return (
            <React.Fragment key={idx}>
              <BigButtonColMin
                selected={isCurrentHour}
                top={0}
                bottom={0}
                md={1}>
                {t.time.format("HH:mm")}
              </BigButtonColMin>
              <BigCol md={10}>
                <FlexCol align="center" justify="center">
                  <Schedules 
                    isDay={true}
                    items={directions} 
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