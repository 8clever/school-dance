import React from "react";
import { BigRow, BigCol, BigHr } from "./Big";
import { FlexCol } from "./Flex";
import { routerStore } from "../store/RouterStore";

import leftSVG from "../images/icons/arrow-left.svg";

interface PageTitleProps {
  children: string;
  marquee?: boolean;
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
              <img src={leftSVG} width={10} height={10} />
            </div>
            <div 
              className={props.marquee ? "marquee" : ""}
              style={{ 
                padding: 5 
              }}>
                <span>
                  {props.children}
                </span>
            </div>
            <div style={{ padding: 5 }}></div>
          </FlexCol>
        </BigCol>
      </BigRow>
      <BigHr />
    </>
  )
}