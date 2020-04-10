import React from "react";
import { Base, BigRow, BigCol } from "../components";

import imgFondDiana from "../images/partners/fond_diana.png";
import imgСontextWhite from "../images/partners/context_white.png";
import imgIlimg from "../images/partners/ilim.png";
import imgAstoria from "../images/partners/astoria.png";
import imgGollandia from "../images/partners/new_gollandiya.png";
import imgCinema from "../images/partners/new_cinema.png";
import imgBalletMesse from "../images/partners/ballet_messe.png";
import imgVoss from "../images/partners/voss.png";
import dialogArts from "../images/partners/dialog-arts.png";

import { PageBreadcrumbs } from "../components/PageTitle";

interface PartnerButtonProps {
  img: string;
  title: string;
  link: string;
}

const height = 260;

const PartnerButton = (props: PartnerButtonProps) => {

  const image = (
    <div 
      style={{
        background: `url("${props.img}") no-repeat center / contain`
      }}
      className="absolute-container m-5 image" 
    />
  )

  const text = (
    <div 
      className="absolute-container text" style={{
        fontFamily: "Styled Font",
        fontSize: 17.5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textTransform: "uppercase"
      }}>
      <div style={{
        textAlign: "center"
      }}>
        {props.title}
      </div>
    </div>
  )

  return (
    <BigCol
      className="partner" 
      height={height}
      onClick={() => {
        window.location.href = props.link;
      }}>
      {image}
      {text}
    </BigCol>
  )
}

export const Partners = () => {
  return (
    <Base >

      <PageBreadcrumbs 
        items={[
          {
            title: "Партнёры"
          }
        ]}
      />

      <BigRow style={{ fontFamily: "Styled Font" }}>
        <PartnerButton 
          link="https://www.ilimgroup.ru"
          title={`ГРУППА "ИЛИМ"`}
          img={imgIlimg}
        />
        <PartnerButton 
          link="https://simplewine.ru/catalog/voda_i_soki/filter/manufacturer-voss/"
          title="VOSS"
          img={imgVoss}
        />
        <PartnerButton 
          link="https://balletmesse.com/mc1/"
          title="Ballet Messe"
          img={imgBalletMesse}
        />
        <PartnerButton 
          link="https://www.roccofortehotels.com/ru/hotels-and-resorts/hotel-astoria/"
          title="Отель Астория"
          img={imgAstoria}
        />
        <PartnerButton 
          link="http://www.newhollandsp.ru"
          title="Новая Голландия"
          img={imgGollandia}
        />
        <PartnerButton 
          link="http://www.dianavishneva.com/ru/foundation/"
          title="ФОНД ДИАНЫ ВИШНЁВОЙ"
          img={imgFondDiana}
        />
        <PartnerButton 
          link="http://www.contextfest.com"
          title="ФЕСТИВАЛЬ CONTEXT"
          img={imgСontextWhite}
        />
        <PartnerButton 
          link="https://alexandrinsky.ru"
          title="Новая Сцена Александринского театра"
          img={imgCinema}
        />
        <PartnerButton 
          link="https://google.ru"
          title="Диалог Искусств"
          img={dialogArts}
        />
      </BigRow>
    </Base>
  )
}