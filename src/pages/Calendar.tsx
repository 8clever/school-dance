import React from "react";
import { Base, BigRow, BigButtonCol, BigButtonColMin } from "../components";
import { PageTitle } from "../components/PageTitle";

export const Calendar = () => {
  return (
    <Base>
      <PageTitle>РАСПИСАНИЕ</PageTitle>
      <BigRow>
          <BigButtonColMin>
            НАПРАВЛЕНИЯ (ВСЕ)  
          </BigButtonColMin>      
          <BigButtonColMin>
            ДЕНЬ 
          </BigButtonColMin>      
          <BigButtonColMin>
            КУПИТЬ АБОНЕМЕНТ  
          </BigButtonColMin>      
      </BigRow>    
    </Base>
  )
}