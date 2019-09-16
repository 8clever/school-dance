import React from "react";
import { UncontrolledCarousel } from "reactstrap";
import { BigRow, Base, BigButtonCol } from "../../components";

import home1png from "../../images/home_1.jpg";
import home2png from "../../images/home_2.jpg";
import home3png from "../../images/home_3.jpg";

const carousel = [
  { src: home1png },
  { src: home2png },
  { src: home3png }
];

export const Home = () => {
  return (
    <Base>
      <UncontrolledCarousel items={carousel} />
    </Base>
  )
}