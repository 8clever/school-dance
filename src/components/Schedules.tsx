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
  children: React.ReactNode ;
}) => {
  return (
    <div 
      className={`text-center ${props.idx % 2 ? "bg-gray" : ""}`}
      style={{
        opacity: props.disabled ? 0.4 : 1,
        padding: "20px",
        width: "100%"
      }}>
      {props.children}
    </div>
  )
}

export const Schedules = (props: ScheduleProps) => {
  if (!props.items.length) return <Wrapper idx={0} children="" />;

  return (
    <>
      {
        props.items.map((s, idx) => {
          return (
            <Wrapper 
              key={idx}
              idx={idx}
              disabled={s.disabled}
              children={props.isDay ? s.name : s.shortName || s.name}
            />
          )
        })
      }
    </>
  )
}