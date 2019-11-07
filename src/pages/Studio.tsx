import React from "react";
import { Base, BigRow, BigButtonCol, BigCol } from "../components";
import { routerStore } from "../store/RouterStore";
import { Carousel } from "../components/Carousel";

import studio1PNG from "../images/studio/studio.png"

interface StudioMenuProps {
  active?: "leaders" | "teachers" | "history"
}

export const StudioMenu = (props: StudioMenuProps) => {

  return (
    <BigRow style={{ fontFamily: "Styled Font" }}>
      <BigButtonCol 
        selected={props.active === "leaders"}
        onClick={() => routerStore.push("/leaders")}>
        РУКОВОДСТВО
      </BigButtonCol>
      <BigButtonCol
        selected={props.active === "teachers"}
        onClick={() => routerStore.push("/teachers")}>
        ПЕДАГОГИ
      </BigButtonCol>
      <BigButtonCol>
        ИСТОРИЯ
      </BigButtonCol>
    </BigRow>
  )
}

export const Studio = () => {
  return (
    <Base>
      <BigRow>
        <BigCol md={12}>
          <Carousel 
            items={[
              {
                src: studio1PNG
              }
            ]}
          />
        </BigCol>
      </BigRow>
      <StudioMenu />
    </Base>
  )
}