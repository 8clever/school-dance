import React from "react";
import { Base, BigHr, BigRow, BigButtonCol, BigEmptyRow, Icon } from "../components";
import { observer } from "mobx-react-lite";
import { PageTitle } from "../components/PageTitle";
import { Carousel } from "../components/Carousel";
import { configStore } from "../store/ConfigStore";
import { imageStore } from "../store/ImageStore";
import { userStore } from "../store/UserStore";
import { HomePageEdit } from "../components/HomePageEdit";

export const Home = observer(() => {
  const [ homePageEditVisible, setHomePageEditVisible ] = React.useState(false);

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

      <BigEmptyRow />

      {
        userStore.isAdmin() ?
        <BigRow>
          <BigButtonCol 
            style={{
              fontFamily: "Styled Font"
            }}
            onClick={() => {
              setHomePageEditVisible(true);
            }}>
            <Icon type="pencil-alt" className="mr-3" /> 
            ДОМАШНЯЯ СТРАНИЦА
          </BigButtonCol>
        </BigRow> : null
      }

      <HomePageEdit 
        visible={homePageEditVisible}
        toggle={() => setHomePageEditVisible(!homePageEditVisible)}
        onSave={() => {
          configStore.getConfig();
        }}
      />
    </Base>
  )
})