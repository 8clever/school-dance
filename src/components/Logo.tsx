import React from "react";
import logoPNG from "../images/logo.png";

interface LogoProps {
  width?: number;
  height?: number;
}

export const Logo = (props: LogoProps) => {
  return (
    <img {...props} src={logoPNG} />
  )
}