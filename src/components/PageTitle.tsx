import React from "react";
import { BigRow, BigCol, BigHr } from "./Big";

interface PageTitleProps {
  children: string;
}

export const PageTitle = (props: PageTitleProps) => {
  
  React.useEffect(() => {
    document.title = props.children;
  }, []);
  
  return (
    <>
      <BigRow>
        <BigCol className="text-center" md={12}>
          {props.children}
        </BigCol>
      </BigRow>
      <BigHr />
    </>
  )
}