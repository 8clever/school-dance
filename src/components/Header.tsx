import React from "react";
import { BigRow, BigCol } from "./Big";
import { Logo } from "./Logo";
import { 
  ButtonGroup, 
  Button,
  InputGroup,
  Input,
  InputGroupText
} from "reactstrap";
import { FlexCol } from "./Flex";
import { observer } from "mobx-react-lite";
import { routerStore } from "../store/RouterStore";
import { menuStore } from "../store/MenuStore";

import menuPNG from "../images/icons/menu.png";
import closePNG from "../images/icons/close.png";
import { HeaderMenu } from "./HeaderMenu";
import { notifStore } from "../store/NotifStore";
import zalupaSVG from "../images/icons/zalupa.svg";

const bigColStyle: React.CSSProperties = {
  minHeight: 64
}

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
        <BigCol
          onClick={() => {
            routerStore.push("/");
          }}
          style={{
            ...bigColStyle,
            boxShadow: "0px 1px 0px 0px black"
          }}
          xs={6}>
          <FlexCol align="center">
            <Logo 
              style={{
                cursor: "pointer",
                marginLeft: 20
              }}
              width={125} 
            />
          </FlexCol>
        </BigCol>
        <BigCol 
          style={bigColStyle}
          className="order-1 order-md-0 d-md-block">
          <FlexCol align="center">
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
          </FlexCol>
        </BigCol>
        <BigCol 
          xs={6}
          style={{
            ...bigColStyle,
            borderLeft: "none"
          }}
          className="text-right">
          <FlexCol align="center" justify="end">
            <ButtonGroup>
              <Button 
                style={{
                  padding: "12px 15px"
                }}
                color="link"
                onClick={menuStore.toggle}>
                  {
                    menuStore.isCollapsed ?
                    <img width={30} height={30} src={menuPNG} /> :
                    <img width={30} className="close" src={closePNG} />
                  }
              </Button>
            </ButtonGroup>
          </FlexCol>
        </BigCol>
      </BigRow>
      <div 
        style={{
          display: menuStore.isCollapsed ? "none" : "block"
        }}
        className="menu-container">
        <div className="row no-gutters">
          <div className="col-12 col-md-4 bg-white ml-auto">
            <HeaderMenu />
          </div>
        </div>
      </div>
    </div>
  )
})