import React from "react";

import { Col, Row, Button, ButtonProps } from "reactstrap";

interface BigButtonCellProps extends ButtonProps {}

export const BigButtonCol = (props: BigButtonCellProps) => {
  return (
    <BigCol>
      <Button
        {...props}
        style={{
          padding: 70
        }}
        size="lg"
        block
        color="link">
        {props.children}
      </Button>
    </BigCol>
  )
}

interface BigColProps {
  children?: React.ReactNode;
  className?: string;
  md?: number;
}

export const BigCol = (props: BigColProps) => {
  return (
    <Col
      className={props.className}
      md={props.md | 4}  
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

export const BigRow = (props: { children?: React.ReactNode }) => {
  return (
    <Row noGutters>
      {props.children}
    </Row>
  )
}