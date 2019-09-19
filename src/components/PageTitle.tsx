import React from "react";
import { BigRow, BigCol, BigHr } from "./Big";
import { FlexCol } from "./Flex";
import { Icon } from "./Icon";
import { routerStore } from "../store/RouterStore";

interface PageTitleProps {
  children: string;
}

export const PageTitle = (props: PageTitleProps) => {
  
  React.useEffect(() => {
    document.title = props.children;
  }, [props.children]);
  
  return (
    <>
      <BigRow>
        <BigCol md={12}>
          <FlexCol justify="between" align="center">
            <div 
              onClick={routerStore.history.goBack}
              style={{ 
                padding: 5,
                cursor: "pointer"
              }}>
              <Icon type="chevron-left" />
            </div>
            <div style={{ padding: 5 }}>
              {props.children}
            </div>
            <div style={{ padding: 5 }}></div>
          </FlexCol>
        </BigCol>
      </BigRow>
      <BigHr />
    </>
  )
}