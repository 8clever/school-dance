import React from "react";
import { Base, BigHr, BigRow, BigButtonCol } from "../components";
import { observer } from "mobx-react-lite";
import { PageTitle } from "../components/PageTitle";
import { Carousel } from "../components/Carousel";
import { configStore } from "../store/ConfigStore";
import { imageStore } from "../store/ImageStore";
import { routerStore } from "../store/RouterStore";

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

      <BigRow>
        <BigButtonCol
          onClick={() => routerStore.push("/projects")}
          style={{
            fontFamily: "Styled Font"
          }}>
          ПРОЕКТЫ
        </BigButtonCol>
        <BigButtonCol
          style={{
            fontFamily: "Styled Font"
          }}>
          НАПРАВЛЕНИЯ
        </BigButtonCol>
        <BigButtonCol
          style={{
            fontFamily: "Styled Font"
          }}>
          МАСТЕР-КЛАССЫ
        </BigButtonCol>
      </BigRow>
    </Base>
  )
})