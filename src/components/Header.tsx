import React from "react";
import { BigRow, BigCol, BigHr } from "./Big";
import { Logo } from "./Logo";
import { 
  Input, 
  ButtonGroup, 
  Button, 
  InputGroup, 
  InputGroupText, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem, 
  UncontrolledButtonDropdown 
} from "reactstrap";
import { Icon } from "./Icon";
import { FlexCol } from "./Flex";
import { Login } from "./Login";

export const Header = () => {

  const [ isVisibleLogin, setIsVisbileLogin ] = React.useState(false);

  return (
    <div className="sticky-top bg-white">
      <BigRow>
        <BigCol className="d-none d-md-block">
          <FlexCol justify="center" align="center">
            <Logo width={100} />
          </FlexCol>
        </BigCol>
        <BigCol className="d-none d-md-block">
          <InputGroup style={{ marginTop: 1 }}>
            <Input placeholder="Поиск..." />
            <InputGroupText>
              <Icon 
                type="search" 
              />
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
            <UncontrolledButtonDropdown inNavbar>
              <DropdownToggle>
                <Icon type="bars" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => { setIsVisbileLogin(true) }}>
                  Вход <Icon type="sign-in-alt" />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </ButtonGroup>
        </BigCol>
      </BigRow>
      <BigRow>
        <BigCol className="text-center" md={12}>
          Направление
        </BigCol>
      </BigRow>
      <Login 
        visible={isVisibleLogin}
        toggle={() => { setIsVisbileLogin(!isVisibleLogin) }} 
      />
    </div>
  )
}