import React from "react";

export interface FlexColProps {
  children?: React.ReactNode;
  justify?: "start" | "end" | "center" | "between" | "around";
  size?: "xs" | "md" | "lg" | "xl";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  alignSelf?: "start" | "end" | "center" | "baseline" | "stretch";
}

export const FlexCol = (props: FlexColProps) => {
  const className = [
    "d-flex",
    "h-100"
  ]

  if (props.justify) {
    const classNameJustify = [
      "justify",
      "content"
    ]

    if (props.size) {
      classNameJustify.push(props.size);
    }

    classNameJustify.push(props.justify);
    className.push(classNameJustify.join("-"));
  }

  if (props.align) {
    const classNameAlign = [
      "align",
      "items"
    ]

    if (props.size) {
      classNameAlign.push(props.size);
    }

    classNameAlign.push(props.align);
    className.push(classNameAlign.join("-"));
  }

  if (props.alignSelf) {
    const classNameAlign = [
      "align",
      "self"
    ]

    if (props.size) {
      classNameAlign.push(props.size);
    }

    classNameAlign.push(props.align);
    className.push(classNameAlign.join("-"));
  }
  
  return (
    <div className={className.join(" ")}>
      {props.children}
    </div>
  )
}