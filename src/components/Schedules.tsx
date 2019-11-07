import React from "react";

export interface ScheduleItem {
  name: string;
  disabled?: boolean;
  shortName?: string;
}

interface ScheduleProps {
  items: ScheduleItem[];
  isDay?: boolean;
}

export const Wrapper = (props: { 
  idx: number;
  disabled?: boolean;
  children: React.ReactNode;
  length: number;
  className?: string;
  style?: React.CSSProperties;
  selected?: boolean;
}) => {
  const border = props.idx < props.length - 1;

  return (
    <div 
      className={`h-100 w-100 ${props.className}`}
      style={{
        ...props.style,
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
    </div>
  )
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
            />
          )
        })
      }
    </>
  )
}