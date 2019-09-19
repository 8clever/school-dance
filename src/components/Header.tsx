import React, { CSSProperties } from "react";
import { BigRow, BigCol, BigButtonColMin } from "./Big";
import { Logo } from "./Logo";
import { 
  Input, 
  ButtonGroup, 
  Button, 
  InputGroup, 
  InputGroupText, 
  DropdownToggle, 
  DropdownMenu, 
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
  const menuStyle: CSSProperties = {
    padding: "20px 80px",
  }

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
              <DropdownMenu style={{ padding: 0, minWidth: 400 }} right>
                <BigRow>
                  <BigButtonColMin 
                    onClick={() => routerStore.history.push("/")}
                    xs={12}
                    md={12}>
                    НАПРАВЛЕНИЯ
                  </BigButtonColMin>
                  <BigButtonColMin 
                    onClick={() => routerStore.history.push("/studio")}
                    xs={12} 
                    md={12}>
                    СТУДИЯ
                  </BigButtonColMin>
                  {
                    userStore.user ?
                    <BigButtonColMin 
                      xs={12} 
                      md={12}
                      onClick={() => { userStore.logout(); }}>
                      Выход <Icon type="sign-out-alt" />
                    </BigButtonColMin> :
                    <BigButtonColMin 
                      xs={12} 
                      md={12}
                      onClick={() => { setIsVisbileLogin(true) }}>
                      Вход <Icon type="sign-in-alt" />
                    </BigButtonColMin>
                  }

                  <BigCol md={12}>
                    <div style={{ padding: 30 }}>
                      <p>
                        Позвоните нам: +7 (812) 602-07-25
                        <br />
                        <small>
                          пн-пт 10:00 - 20:00
                        </small>
                      </p>
                      
                      <p>
                        Напишите нам: contextprostudio@gmail.com
                        <br/>
                        <small>
                          ответим в течении рабочего дня
                        </small>
                      </p>
                    </div>
                  </BigCol>
                </BigRow>
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