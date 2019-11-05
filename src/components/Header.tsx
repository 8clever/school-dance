import React from "react";
import { BigRow, BigCol } from "./Big";
import { Logo } from "./Logo";
import { 
  Input, 
  ButtonGroup, 
  Button, 
  InputGroup, 
  InputGroupText
} from "reactstrap";
import { FlexCol } from "./Flex";
import { Notification } from "./Notification";
import { observer } from "mobx-react-lite";
import { routerStore } from "../store/RouterStore";
import { menuStore } from "../store/MenuStore";

import scheduleSVG from "../images/icons/schedule.svg";
import zalupaSVG from "../images/icons/zalupa.svg";
import menuSVG from "../images/icons/menu.svg";
import closeSVG from "../images/icons/close.svg";
import { HeaderMenu } from "./HeaderMenu";
import { notifStore } from "../store/NotifStore";




export const Header = observer(() => {

  const [ searchValue, setSearchValue ] = React.useState("");

  const onSearch = () => {
    if (searchValue.length < 3) {
      notifStore.addNotif({
        duration: 5,
        message: "Минимум 3 символа",
        title: "Ошибка"
      });
      return;
    }

    routerStore.push(`/search?text=${searchValue}`)
  }

  return (
    <div className="sticky-top bg-white">
      <BigRow>
        <BigCol className="d-none d-md-block">
          <FlexCol justify="start" align="center">
            <div 
              onClick={() => routerStore.push("/")} 
              style={{ 
                padding: "0px 10px",
                cursor: "pointer" 
              }}>
              <Logo width={100} />
            </div>
          </FlexCol>
        </BigCol>
        <BigCol className="order-1 order-md-0 d-md-block">
          <InputGroup 
            tyle={{ marginTop: 1 }}>
            <Input
              onKeyPress={e => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
              className="bg-white"
              id="input-search"
              value={searchValue}
              onChange={e => {
                setSearchValue(e.target.value);
              }}
            />
            <InputGroupText 
              onClick={onSearch}
              style={{
                cursor: "pointer"
              }}>
              <img 
                height={15}
                width={15}
                src={zalupaSVG} 
              />
            </InputGroupText>
          </InputGroup>
        </BigCol>
        <BigCol className="text-right">
          <ButtonGroup>
            <Button 
              style={{
                fontFamily: "Roboto"
              }}
              color="link">
              РУ
            </Button>
            <Button 
              onClick={() => {
                routerStore.push("/calendar")
              }}
              color="link">
              <img 
                style={{
                  width: 23
                }}
                src={scheduleSVG} 
              />
            </Button>
            <Button 
              color="link"
              onClick={menuStore.toggle}>
                {
                  menuStore.isCollapsed ?
                  <img src={menuSVG} /> :
                  <img src={closeSVG} />
                }
            </Button>
          </ButtonGroup>
        </BigCol>
      </BigRow>
      <Notification />
      {
        menuStore.isCollapsed ? null :
        <div className="menu-container">
          <div className="row no-gutters">
            <div className="col-12 col-md-4 bg-white ml-auto">
              <HeaderMenu />
            </div>
          </div>
        </div>
      }
    </div>
  )
})