import React from "react";
import { BigRow, BigCol } from "./Big";
import { Logo } from "./Logo";
import { 
  ButtonGroup, 
  Button
} from "reactstrap";
import { FlexCol } from "./Flex";
import { observer } from "mobx-react-lite";
import { routerStore } from "../store/RouterStore";
import { menuStore } from "../store/MenuStore";

import menuPNG from "../images/icons/menu.png";
import closePNG from "../images/icons/close.png";
import { HeaderMenu } from "./HeaderMenu";

const bigColStyle: React.CSSProperties = {
  minHeight: 64
}

export const Header = observer(() => {
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
          className="order-1 order-md-0 d-md-block d-none">
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