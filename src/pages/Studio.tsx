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
      <BigButtonCol onClick={() => routerStore.push("/leaders")}>
        <div style={{
          fontWeight: props.active === "leaders" ? 600 : undefined
        }}>
          РУКОВОДСТВО
        </div>
      </BigButtonCol>
      <BigButtonCol onClick={() => routerStore.push("/teachers")}>
        <div style={{
          fontWeight: props.active === "teachers" ? 600 : undefined
        }}>
          ПЕДАГОГИ
        </div>
      </BigButtonCol>
      <BigButtonCol>
        <div style={{
          fontWeight: props.active === "history" ? 600 : undefined
        }}>
          ИСТОРИЯ
        </div>
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