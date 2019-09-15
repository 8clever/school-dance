import React from "react";
import { BigRow, BigCol, BigHr } from "./Big";
import { Logo } from "./Logo";
import { Input, ButtonGroup, Button, InputGroup, InputGroupText } from "reactstrap";
import { Icon } from "./Icon";
import { FlexCol } from "./Flex";

export const Header = () => {
  return (
    <div className="sticky-top bg-white">
      <BigRow>
        <BigCol className="d-none d-md-block">
          <FlexCol justify="center" align="center">
            <Logo />
          </FlexCol>
        </BigCol>
        <BigCol className="d-none d-md-block">
          <InputGroup>
            <Input />
            <InputGroupText>
              <Icon type="search" />
            </InputGroupText>
          </InputGroup>
        </BigCol>
        <BigCol className="text-right">
          <ButtonGroup>
            <Button color="link">
              РУ
            </Button>
            <Button color="link">
              <Icon type="calendar-alt" />
            </Button>
            <Button color="link">
              <Icon type={"bars"} />
            </Button>
          </ButtonGroup>
        </BigCol>
      </BigRow>
      <BigRow>
        <BigCol className="text-center" md={12}>
          Направление
        </BigCol>
      </BigRow>
    </div>
  )
}