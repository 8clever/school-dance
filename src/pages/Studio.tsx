import React from "react";
import { Base, BigRow, BigButtonCol, BigCol } from "../components";
import { PageTitle } from "../components/PageTitle";
import { routerStore } from "../store/RouterStore";
import { Carousel } from "../components/Carousel";

import studio1PNG from "../images/studio/studio.png"

export const Studio = () => {
  return (
    <Base>
      <PageTitle>СТУДИЯ</PageTitle>
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
      <BigRow style={{ fontFamily: "Styled Font" }}>
        <BigButtonCol onClick={() => routerStore.push("/leaders")}>
          РУКОВОДСТВО
        </BigButtonCol>
        <BigButtonCol onClick={() => routerStore.push("/teachers")}>
          ПЕДАГОГИ
        </BigButtonCol>
        <BigButtonCol>
          ИСТОРИЯ
        </BigButtonCol>
      </BigRow>
    </Base>
  )
}