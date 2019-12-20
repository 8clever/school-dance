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
import { configStore } from "../store/ConfigStore";
import { Icon } from "./Icon";
import { userStore } from "../store/UserStore";

interface TimePickerProps {
  onClickPlus: () => void;
  onClickMinus: () => void;
}

export const TimePicker = (props: TimePickerProps) => {
  return (
    <>
      <Icon 
        onClick={e => {
          e.stopPropagation();
          props.onClickPlus();
        }}
        type="plus-circle" size="lg" 
      />
      <Icon 
        onClick={e => {
          e.stopPropagation();
          props.onClickMinus();
        }}
        type="minus-circle ml-3" 
        size="lg" 
      />
    </>
  )
}

export const CalendarDay = observer((props: CalendarInnerProps) => {
  const { date, setDate } = props;
  const times = getTimes(date);
  const selectedDirection = _.find(directionStore.itemList, _.matches({ _id: props.selectedDirectionId }));
  
  if (!configStore.item) return null;

  return (
    <BigRow>
      <BigButtonColMin 
        onClick={() => {
          const prev = moment(date).add(-1, "day").toDate();
          setDate(prev);
        }}
        xs={2}
        md={1}>
        <img src={leftSVG} width={15} height={15} />
      </BigButtonColMin>
      <BigButtonColMin 
        selected={moment().isSame(date, "day")}
        xs={8}
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
        xs={2}
        md={1}>
        <img src={rightSVG} width={15} height={15} />
      </BigButtonColMin>
      {
        times.map((t, idx) => {
          if (!(
            idx >= configStore.item.calendarTimeRange.from && 
            idx <= configStore.item.calendarTimeRange.to
          )) return null;

          const directions = findSchedulesByTime(
            t.time, 
            selectedDirection ? [selectedDirection] : directionStore.itemList
          );
          const isCurrentHour = t.time.format("HH") === moment().format("HH");

          return (
            <React.Fragment key={idx}>
              <BigButtonColMin
                selected={isCurrentHour}
                xs={2}
                md={1}>
                {t.time.format("HH:mm")}
              </BigButtonColMin>
              <BigCol 
                xs={8}
                md={10}>
                <FlexCol align="center" justify="center">
                  <Schedules 
                    isDay={true}
                    items={directions} 
                  />
                </FlexCol>
              </BigCol>
              <BigButtonColMin 
                xs={2}
                md={1}>
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