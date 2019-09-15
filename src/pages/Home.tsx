import React from "react";
import { UncontrolledCarousel } from "reactstrap";
import { BigRow, BigCol, BigButtonCol } from "../components/Big";
import { Base } from "../components/Base";

import home1png from "../images/home_1.jpg";
import home2png from "../images/home_2.jpg";
import home3png from "../images/home_3.jpg";

const carousel = [
  { src: home1png },
  { src: home2png },
  { src: home3png }
];

export const Home = () => {
  return (
    <Base>
      <UncontrolledCarousel items={carousel} />
      {
        [1, 2, 3].map(idx => {
          return (
            <BigRow key={idx}>
              <BigButtonCol>Я первый</BigButtonCol>
              <BigButtonCol>Я второй</BigButtonCol>
              <BigButtonCol>Я третий</BigButtonCol>
            </BigRow>
          )
        })
      }
    </Base>
  )
}