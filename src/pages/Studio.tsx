import React from "react";
import { Base, BigRow, BigButtonCol } from "../components";
import { PageTitle } from "../components/PageTitle";
import { routerStore } from "../store/RouterStore";
import { Carousel } from "../components/Carousel";

import studi1PNG from "../images/studio/studio.png"

export const Studio = () => {
  return (
    <Base>
      <PageTitle>СТУДИЯ</PageTitle>
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