import React from "react";
import { BigRow, BigCol } from "./Big";
import { FlexCol } from "./Flex";

interface PageTitleProps {
  children: string;
  marquee?: boolean;
}

export const PageTitle = (props: PageTitleProps) => {
  
  React.useEffect(() => {
    document.title = props.children;
  }, [props.children]);

  const [ play, setPlay ] = React.useState(true);
  
  return (
    <>
      <BigRow>
        <BigCol md={12} onClick={() => {
          setPlay(!play)
        }}>
          <FlexCol justify="between" align="center">
            <div 
              className={props.marquee ? "marquee" : ""}
              style={{ 
                padding: 5 
              }}>
                <span className={play ? "" : "stop"}>
                  {props.children}
                </span>
            </div>
            <div style={{ padding: 5 }}></div>
          </FlexCol>
        </BigCol>
      </BigRow>
    </>
  )
}