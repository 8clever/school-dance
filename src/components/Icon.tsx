import React from "react";

interface Props {
  type: string;
  size?: "xs" | "sm" | "lg" | "2x" | "3x" | "5x" | "7x" | "10x";
  sub?: string;
}

export const Icon = (props: Props) => {
  const { 
    sub = "s",
    size,
    type
  } = props;

  const clasName = [ 
    `fa${sub}`,
    `fa-${type}`
  ];

  if (size) {
    clasName.push(`fa-${size}`);
  }

  return (
    <i 
      className={clasName.join(" ")} 
    />
  )
}