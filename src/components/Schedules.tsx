import React from "react";
import { Direction } from "../../server/models/Direction";

interface ScheduleProps {
  items: Direction[];
  isDay?: boolean;
}

const Wrapper = (props: { 
  idx: number;
  children: React.ReactNode ;
}) => {
  return (
    <div 
      className="text-center"
      style={{
        padding: "20px",
        width: "100%",
        backgroundColor: props.idx % 2 ? "#f0f3f7" : undefined
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
              children={props.isDay ? s.name : s.shortName || s.name}
            />
          )
        })
      }
    </>
  )
}