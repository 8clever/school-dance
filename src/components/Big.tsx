import React from "react";

import { Col, Row, Button, ButtonProps, RowProps } from "reactstrap";
import { FlexCol } from "./Flex";

interface BigButtonCellProps extends ButtonProps {
  md?: number;
  xs?: number;
  padding?: string;
  onClick?: () => void;
}

export const BigButtonColMin = (p: BigButtonCellProps) => {
  const props = { ...p };
  props.size = props.size || "";
  props.md = props.md || 6;
  props.padding = "20px 0";

  return (
    <BigButtonCol {...props} />
  )
}

export const BigButtonCol = (props: BigButtonCellProps) => {
  const { size="lg", md = 4, xs, } = props;
  return (
    <BigCol md={md} xs={xs} className={props.className}>
      <FlexCol justify="center" align="center">
        <Button
          onClick={props.onClick}
          style={{
            fontFamily: "Main Font",
            padding: props.padding || "40px 20px"
          }}
          href={props.href}
          size={size}
          color="link">
          {props.children}
        </Button>
      </FlexCol>
    </BigCol>
  )
}

interface BigColProps {
  children?: React.ReactNode;
  className?: string;
  md?: number;
  xs?: number;
  lg?: number;
}

export const BigCol = (props: BigColProps) => {
  return (
    <Col
      className={props.className}
      md={props.md | 4}  
      xs={props.xs}
      lg={props.lg}
      style={{
        boxShadow: "1px 1px 0px 0px black",
        borderTop: "1px solid black",
        borderLeft: "1px solid black"
      }}>
      {props.children}
    </Col>
  )
}

export const BigHr = () => {
  return (
    <BigRow>
      <BigCol md={12}></BigCol>
    </BigRow>
  )
}

export const BigRow = (props: RowProps) => {
  return (
    <Row noGutters {...props as any } />
  )
}