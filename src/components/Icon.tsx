import React from "react";

interface Props {
  draggable?: boolean;
  type: string;
  size?: "xs" | "sm" | "lg" | "2x" | "3x" | "5x" | "7x" | "10x";
  sub?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Icon = (props: Props) => {
  const { 
    sub = "s",
    size,
    type,
    className: classNameParent = ""
  } = props;

  const clasName = [ 
    `fa${sub}`,
    `fa-${type}`
  ];
  classNameParent.split(" ").forEach((c) => {
    clasName.push(c);
  });

  if (size) {
    clasName.push(`fa-${size}`);
  }

  return (
    <i 
      draggable={props.draggable}
      onClick={props.onClick}
      style={props.style}
      className={clasName.join(" ")} 
    />
  )
}