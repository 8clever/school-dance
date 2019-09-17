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
import { Notification } from "./Notification";
import { observer } from "mobx-react-lite";
import { userStore } from "../store/UserStore";
import { routerStore } from "../store/RouterStore";

export const Header = observer(() => {

  const [ isVisibleLogin, setIsVisbileLogin ] = React.useState(false);

  return (
    <div className="sticky-top bg-white">
      <BigRow>
        <BigCol className="d-none d-md-block">
          <FlexCol justify="center" align="center">
            <div onClick={() => routerStore.history.push("/")} style={{ cursor: "pointer" }}>
              <Logo width={100} />
            </div>
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
                {
                  userStore.user ?
                  <DropdownItem onClick={() => { userStore.logout(); }}>
                    Выход <Icon type="sign-out-alt" />
                  </DropdownItem> :
                  <DropdownItem onClick={() => { setIsVisbileLogin(true) }}>
                    Вход <Icon type="sign-in-alt" />
                  </DropdownItem>
                }
                
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </ButtonGroup>
        </BigCol>
      </BigRow>
      <Notification />
      <Login 
        visible={isVisibleLogin}
        toggle={() => { setIsVisbileLogin(!isVisibleLogin) }} 
      />
    </div>
  )
})