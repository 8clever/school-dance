import React from "react";
import { BigRow, BigCol, BigButtonColMin } from "./Big";
import { FlexCol } from "./Flex";
import moment from "moment";

import leftSVG from "../images/icons/arrow-left.png";
import rightSVG from "../images/icons/arrow-right.png";

interface HeaderCalendarProps {
  date: Date;
  onChange: (date: Date) => void;
  leftButtonActive?: boolean;
  leftButtonText: string;
  leftButtonOnClick?: () => void;
  rightButtonActive?: boolean;
  rightButtonText: string;
  rightButtonOnClick?: () => void;
  format: "MM.YYYY" | "DD.MM.YYYY";
  step: "month" | "day";
}

export const HeaderCalendar = (props: HeaderCalendarProps) => {

  return (
    <BigRow>
        <BigButtonColMin
          selected={props.leftButtonActive}
          xs={6}
          md={4}
          padding={"15px 0"} 
          onClick={props.leftButtonOnClick}>
          {props.leftButtonText}
        </BigButtonColMin>
        <BigCol xs={6}>
          <FlexCol align="center" justify="between">
            <div 
              style={{ 
                padding: 10,
                cursor: "pointer" 
              }} 
              onClick={() => {
                props.onChange(moment(props.date).add(-1, props.step).toDate())
              }
            }>
              <img src={leftSVG} width={15} height={15} />
            </div>
            <div style={{ padding: 10 }}>
              {moment(props.date).format(props.format)}
            </div>
            <div 
              style={{ 
                padding: 10,
                cursor: "pointer" 
              }}
              onClick={() => {
              props.onChange(moment(props.date).add(1, props.step).toDate())
            }}>
              <img src={rightSVG} width={15} height={15} />
            </div>
          </FlexCol>
        </BigCol>
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
  )
}