import React from "react";
import { Base, BigRow, BigButtonCol } from "../components";
import { PageTitle } from "../components/PageTitle";
import { routerStore } from "../store/RouterStore";

export const Studio = () => {
  return (
    <Base>
      <PageTitle>СТУДИЯ</PageTitle>
      <BigRow>
        <BigButtonCol onClick={() => routerStore.history.push("/teachers")}>
          ПЕДАГОГИ
        </BigButtonCol>
      </BigRow>
    </Base>
  )
}