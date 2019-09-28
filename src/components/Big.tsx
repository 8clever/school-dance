import React from "react";

import { Col, Row, Button, ButtonProps, RowProps, ColProps } from "reactstrap";
import { FlexCol } from "./Flex";
import _ from "lodash";

interface BigButtonCellProps extends ButtonProps, BigColSize {
  padding?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  width?: number;
  height?: number;
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
    <BigCol 
      height={props.height}
      width={props.width}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      md={md} 
      xs={xs}
      top={props.top} 
      left={props.left} 
      right={props.right} 
      bottom={props.bottom} 
      className={props.className}>
      <FlexCol justify="center" align="center">
        <Button
          onClick={props.onClick}
          style={{
            fontFamily: "Main Font",
            padding: props.padding || "100px 20px"
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

interface BigColProps extends ColProps, BigColSize {
  children?: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  width?: number;
  height?: number;
}

interface BigColSize {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

const defSize = 1;

const validateBorder = (number?: number) => {
  if (_.isUndefined(number)) return defSize;
  return number;
}

export const BigCol = (props: BigColProps) => {
  const defSize = 1;

  const border = {
    top: validateBorder(props.top),
    right: validateBorder(props.right),
    bottom: validateBorder(props.bottom),
    left: validateBorder(props.left)
  }

  return (
    <Col
      onMouseEnter={() => props.onMouseEnter && props.onMouseEnter()}
      onMouseLeave={() => props.onMouseLeave && props.onMouseLeave()}
      className={props.className}
      md={props.md || 4}  
      xs={props.xs}
      lg={props.lg}
      style={{
        boxShadow: `${border.right}px ${border.bottom}px 0px 0px black`,
        borderTop: `${border.top}px solid black`,
        borderLeft: `${border.left}px solid black`,
        width: props.width,
        height: props.height
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