import React from "react";
import { Tooltip } from "reactstrap";
import _ from "lodash"

export interface ScheduleItem {
  name: string;
  disabled?: boolean;
  shortName?: string;
  tooltip?: React.ReactNode;
}

export const Wrapper = (props: { 
  idx: number;
  disabled?: boolean;
  children: React.ReactNode;
  length: number;
  className?: string;
  style?: React.CSSProperties;
  selected?: boolean;
  tooltip?: React.ReactNode;
}) => {
  const border = props.idx < props.length - 1;
  const [ tooltipOpen, setTooltipOpen ] = React.useState(false);
  const [ id ] = React.useState("t_" + _.random(1000000, 9999999));

  return (
    <div 
      id={id}
      className={`h-100 w-100 ${props.className}`}
      style={{
        ...props.style,
        cursor: "pointer",
        position: "relative",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        opacity: props.disabled ? 0.4 : 1,
        width: "100%",
        borderRight: border ? "1px solid black" : undefined
      }}>
      <div 
        style={{ fontWeight: props.selected ? 600 : undefined }} 
        className="text-center w-100">
        {props.children}
      </div>

      {
        props.tooltip ?
        <Tooltip
          target={id}
          toggle={() => setTooltipOpen(!tooltipOpen)}
          isOpen={tooltipOpen}>
          {props.tooltip}
        </Tooltip> : null
      }
    </div>

  )
}

interface ScheduleProps {
  items: ScheduleItem[];
  isDay?: boolean;
}

export const Schedules = (props: ScheduleProps) => {
  if (!props.items.length) return <Wrapper idx={0} length={0} children="" />;

  return (
    <>
      {
        props.items.map((s, idx) => {
          return (
            <Wrapper
              key={idx}
              idx={idx}
              length={props.items.length}
              disabled={s.disabled}
              children={props.isDay ? s.name : s.shortName || s.name}
              tooltip={s.tooltip}
            />
          )
        })
      }
    </>
  )
}