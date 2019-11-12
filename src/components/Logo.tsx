import React from "react";
import logoPNG from "../images/logo.png";

interface LogoProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export const Logo = (props: LogoProps) => {
  return (
    <img {...props} src={logoPNG} />
  )
}