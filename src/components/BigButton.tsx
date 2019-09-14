import React from "react";

import { Col, Row, Button, ButtonProps } from "reactstrap";
import { props } from "bluebird";

interface BigButtonCellProps extends ButtonProps {}

export const BigButtonCell = (props: BigButtonCellProps) => {
  return (
    <BigButtonCol>
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
    </BigButtonCol>
  )
}

export const BigButtonCol = (props: { children?: JSX.Element | JSX.Element[] }) => {
  return (
    <Col style={{
      boxShadow: "1px 1px 0px 0px black",
      borderTop: "1px solid black",
      borderLeft: "1px solid black"
    }}>
      {props.children}
    </Col>
  )
}

export const BigButtonRow = (props: { children?: JSX.Element | JSX.Element[] }) => {
  return (
    <Row noGutters>
      {props.children}
    </Row>
  )
}