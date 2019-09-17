import React from "react";
import { observer } from "mobx-react-lite";
import { userStore } from "../../store/UserStore";
import { Base } from "../../components";
import { PageTitle } from "../../components/PageTitle";

interface DirectionProps {
  id?: string;
}

export const Direction = observer((props: DirectionProps) => {
  
  return (
    <Base>
      <PageTitle>Создание направления</PageTitle>
    </Base>
  )
})