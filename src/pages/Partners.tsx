import React from "react";
import { Base, BigRow, BigCol } from "../components";

import imgFondDiana from "../images/partners/fond_diana.png";
import imgСontextWhite from "../images/partners/context_white.png";
import imgGollandia from "../images/partners/new_gollandiya.png";

import { PageBreadcrumbs } from "../components/PageTitle";
import { I18nText } from "../components/Localization";
import { observer } from "mobx-react-lite";
import { i18nStore } from "../store/i18nStore";

interface PartnerButtonProps {
  img: string;
  title: string;
  link: string;
}

const height = 260;

const PartnerButton = observer((props: PartnerButtonProps) => {

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
        fontSize: 17.5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textTransform: "uppercase"
      }}>
      <div style={{
        textAlign: "center"
      }}>
        <I18nText text={props.title} />
      </div>
    </div>
  )

  return (
    <BigCol
      className={i18nStore.mode === "EDIT" ? "" : "partner"} 
      height={height}
      onClick={() => {
        window.location.href = props.link;
      }}>
      {image}
      {text}
    </BigCol>
  )
})


const partners = [
  {
    link: "http://www.newhollandsp.ru",
    title: "Новая Голландия",
    img: imgGollandia
  },
  {
    link: "http://www.dianavishneva.com/ru/foundation/",
    title: "ФОНД ДИАНЫ ВИШНЁВОЙ",
    img: imgFondDiana
  },
  {
    link: "http://www.contextfest.com",
    title: "ФЕСТИВАЛЬ CONTEXT",
    img: imgСontextWhite
  },
]

export const Partners = () => {
  return (
    <Base >
      <PageBreadcrumbs 
        items={[
          {
            title: <I18nText text="Партнёры" />
          }
        ]}
      />
      <BigRow>
        {
          partners.map(p => {
            return (
              <PartnerButton key={p.link} {...p} />
            )
          })
        }
      </BigRow>
    </Base>
  )
}