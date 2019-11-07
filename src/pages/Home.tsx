import React from "react";
import { BigRow, Base, BigButtonCol, Icon, BigHr } from "../components";
import { observer } from "mobx-react-lite";
import { userStore } from "../store/UserStore";
import { PageTitle } from "../components/PageTitle";
import { DirectionEdit } from "../components/DirectionEdit";
import { directionStore } from "../store/DirectionStore";
import { routerStore } from "../store/RouterStore";

import home1png from "../images/home/main0.png";
import home2png from "../images/home/main1.png";
import home3png from "../images/home/main2.png";
import { Carousel } from "../components/Carousel";
import { DirectionMenu } from "./Direction";

const carousel = [
  { src: home1png },
  { src: home2png },
  { src: home3png }
];

export const Home = observer(() => {

  return (
    <Base>
      <PageTitle marquee>Студия Дианы Вишнёвой Context Pro</PageTitle>
      <BigHr />
      <Carousel items={carousel} />
      <DirectionMenu />
    </Base>
  )
})