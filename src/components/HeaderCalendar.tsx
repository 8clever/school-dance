import React from "react";
import { BigRow, BigCol, BigButtonCol } from "./Big";
import { FlexCol } from "./Flex";
import { Icon } from "./Icon";
import moment from "moment";

interface HeaderCalendarProps {
  date: Date;
  onChange: (date: Date) => void;
  rightButtonText: string;
  rightButtonOnClick?: () => void;
  format: "MM.YYYY" | "DD.MM.YYYY";
  step: "month" | "day";
}

export const HeaderCalendar = (props: HeaderCalendarProps) => {

  return (
    <BigRow>
        <BigCol>
          <FlexCol justify="between" align="center">
            <div style={{ padding: 10 }}>
              <Icon type="chevron-right" />
            </div>
            <div style={{ padding: 10 }}>
              Спектакль
            </div>
            <div></div>
          </FlexCol>
        </BigCol>
        <BigCol >
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
              <Icon type="chevron-left" />
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
              <Icon type="chevron-right" />
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