import React from "react";
import { Base } from "../components";
import { PageBreadcrumbs } from "../components/PageTitle";

export const Orders = () => {
  return (
    <Base>
      <PageBreadcrumbs items={[
        {
          title: "Услуги"
        }
      ]}/>

      
    </Base>
  )
}