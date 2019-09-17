import React from "react";
import { UncontrolledCarousel } from "reactstrap";
import { BigRow, Base, BigButtonCol, Icon, BigCol } from "../../components";

import home1png from "../../images/home_1.jpg";
import home2png from "../../images/home_2.jpg";
import home3png from "../../images/home_3.jpg";
import { observer } from "mobx-react-lite";
import { userStore } from "../../store/UserStore";
import { routerStore } from "../../store/RouterStore";
import { PageTitle } from "../../components/PageTitle";

const carousel = [
  { src: home1png },
  { src: home2png },
  { src: home3png }
];

export const Home = observer(() => {
  return (
    <Base>
      <PageTitle>Направления</PageTitle>
      <UncontrolledCarousel items={carousel} />
      <BigRow>
        {
          userStore.isAdmin() ?
          <BigButtonCol onClick={() => routerStore.history.push("/directions/new")}>
            <Icon type="plus" /> ДОБАВИТЬ НАПРАВЛЕНИЕ
          </BigButtonCol> : null
        }      
      </BigRow>
    </Base>
  )
})