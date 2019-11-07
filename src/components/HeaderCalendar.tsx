import React from "react";
import { BigRow, BigCol, BigButtonCol } from "./Big";
import { FlexCol } from "./Flex";
import moment from "moment";

import leftSVG from "../images/icons/arrow-left.png";
import rightSVG from "../images/icons/arrow-right.png";

interface HeaderCalendarProps {
  date: Date;
  onChange: (date: Date) => void;
  leftButtonText: string;
  leftButtonOnClick?: () => void;
  rightButtonText: string;
  rightButtonOnClick?: () => void;
  format: "MM.YYYY" | "DD.MM.YYYY";
  step: "month" | "day";
}

export const HeaderCalendar = (props: HeaderCalendarProps) => {

  return (
    <BigRow>
        <BigCol
          xs={6} 
          style={{
            cursor: "pointer"
          }}
          onClick={props.leftButtonOnClick}>
          <FlexCol justify="between" align="center">
            <div style={{ padding: 10 }}>
              <img src={rightSVG} width={15} height={15} />
            </div>
            <div style={{ padding: 10 }}>
              {props.leftButtonText}
            </div>
            <div></div>
          </FlexCol>
        </BigCol>
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
        <BigButtonCol 
          onClick={props.rightButtonOnClick}
          className="d-none d-md-block" 
          padding={"15px 0"} 
        >
          {props.rightButtonText}
        </BigButtonCol>
      </BigRow>
  )
}