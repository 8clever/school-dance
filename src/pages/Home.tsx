import React from "react";
import { Base, BigHr } from "../components";
import { observer } from "mobx-react-lite";
import { PageTitle } from "../components/PageTitle";
import { Carousel } from "../components/Carousel";
import { DirectionMenu } from "./Direction";
import { configStore } from "../store/ConfigStore";
import { imageStore } from "../store/ImageStore";

export const Home = observer(() => {

  React.useEffect(() => {
    configStore.getConfig();
  }, []);

  if (!configStore.item) {
    return null;
  }

  return (
    <Base>
      <PageTitle marquee>{configStore.item.homePageTitle}</PageTitle>
      {
        configStore.item.homeCarousel.length ?
        <>
          <BigHr />
          <Carousel items={
            configStore.item.homeCarousel.map(_id => {
              return {
                src: `${imageStore.endpoint}/${_id}`
              }
            })
          } /> 
        </>: 
        null
      }
      <DirectionMenu editHomePage />
    </Base>
  )
})