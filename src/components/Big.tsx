import React from "react";

import { Col, Row, Button, ButtonProps, RowProps, ColProps } from "reactstrap";
import { FlexCol } from "./Flex";
import _ from "lodash";

export interface BigButtonCellProps extends ButtonProps, BigColSize, BigFlexSize {
  padding?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  width?: number;
  height?: number;
  colPadding?: string;
}

export const BigButtonColMin = (p: BigButtonCellProps) => {
  const props = { ...p };
  props.size = props.size || "";
  props.md = props.md || 6;
  props.padding = props.padding || "20px 0";

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
      className={props.className}
      flex={props.flex}
      maxWidth={props.maxWidth}
      padding={props.colPadding}
    >
      <FlexCol justify="center" align="center">
        <Button
          block={props.block}
          onClick={props.onClick}
          style={{
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

interface BigColProps extends ColProps, BigColSize, BigFlexSize {
  children?: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  width?: number;
  height?: number;
  padding?: string;
}

interface BigColSize {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

interface BigFlexSize {
  flex?: string;
  maxWidth?: string;
}

const defSize = 1;

const validateBorder = (number?: number) => {
  if (_.isUndefined(number)) return defSize;
  return number;
}

interface shadowBoxProps {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export const getShadowBoxStyle = (props: shadowBoxProps) => {
  const border = {
    top: validateBorder(props.top),
    right: validateBorder(props.right),
    bottom: validateBorder(props.bottom),
    left: validateBorder(props.left)
  }

  return {
    boxShadow: `${border.right}px ${border.bottom}px 0px 0px black`,
    borderTop: `${border.top}px solid black`,
    borderLeft: `${border.left}px solid black`
  }
}

export const BigCol = (props: BigColProps) => {
  return (
    <Col
      onMouseEnter={() => props.onMouseEnter && props.onMouseEnter()}
      onMouseLeave={() => props.onMouseLeave && props.onMouseLeave()}
      className={props.className}
      md={props.md || 4}  
      xs={props.xs}
      lg={props.lg}
      style={{
        ...getShadowBoxStyle(props),
        width: props.width,
        height: props.height,
        maxWidth: props.maxWidth,
        flex: props.flex,
        padding: props.padding
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

interface BigRowProps extends RowProps {
  maxRowItems?: number;
}

export const BigRow = (props: BigRowProps) => {
  const { children: rawChildren, maxRowItems, ...restProps } = props;
  const children = (
    Array.isArray(rawChildren) ? 
    _.compact(_.flattenDeep(rawChildren)) : 
    rawChildren
  )

  if (maxRowItems && Array.isArray(children) && children.length) {
    const enoughItems = children.length % maxRowItems;
    let emptyItems = new Array(maxRowItems - enoughItems);

    if (children[0] && enoughItems) {
      emptyItems.fill(null);
      emptyItems = emptyItems.map(i => {
        return React.cloneElement(children[0], {
          key: Math.random(),
          children: "",
          className: `${children[0].className || ""} d-none d-md-block`,
          onClick: () => {}
        });
      });

      children.push(...emptyItems);
    }
  }

  return (
    <Row 
      noGutters 
      children={children}
      {...restProps as any } />
  )
}