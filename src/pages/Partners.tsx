import React from "react";
import { Base, BigRow, BigCol } from "../components";
import { CSSTransition } from "react-transition-group";

import imgFondDiana from "../images/partners/fond_diana.png";
import imgСontextWhite from "../images/partners/context_white.png";
import imgIlimg from "../images/partners/ilim.png";
import imgAstoria from "../images/partners/astoria.png";
import imgGollandia from "../images/partners/new_gollandiya.png";
import imgCinema from "../images/partners/new_cinema.png";
import imgGost from "../images/partners/gost.png";
import { isMobile } from "../utils/isMobile";
import { PageTitle } from "../components/PageTitle";

interface PartnerButtonProps {
  img: string;
  title: string;
  link: string;
}

const height = 260;

const PartnerButton = (props: PartnerButtonProps) => {
  const [ isHover, setHover ] = React.useState(false);

  return (
    <>
      {
        isHover ? null :
        <BigCol 
          onClick={() => {
            window.location.href = props.link;
          }}
          height={height}
          onMouseLeave={() => {
            setHover(false)
          }}
          onMouseEnter={() => {
            if (isMobile()) return;
            setHover(true)
          }}>
          <div 
            className="absolute-container" style={{
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
        </BigCol>
      }
      <CSSTransition 
        key={props.title}
        timeout={600}
        classNames="big"
        unmountOnExit
        in={isHover}>
        {
          isHover ?
          <BigCol 
            onClick={() => {
              window.location.href = props.link;
            }}
            onMouseLeave={() => {
              setHover(false)
            }}>
            <div 
              style={{
                background: `url("${props.img}") no-repeat center / contain`
              }}
              className="absolute-container m-5" 
            />
          </BigCol>
          : <></>
        }
      </CSSTransition>
    </>
  )
}

export const Partners = () => {
  return (
    <Base>

      <PageTitle>
        Партнёры
      </PageTitle>

      <BigRow style={{ fontFamily: "Styled Font" }}>
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
          link="https://www.ilimgroup.ru"
          title="ГРУППА КОМПАНИЙ ИЛИМ"
          img={imgIlimg}
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
          link="https://alexandrinsky.ru"
          title="Новая Сцена Александрийского театра"
          img={imgCinema}
        />
        <BigCol height={height} className="d-none d-md-block" />
        <PartnerButton 
          link="https://gost-group.ru"
          title="группа копаний GOST"
          img={imgGost}
        />
        <BigCol height={height} className="d-none d-md-block" />
      </BigRow>
    </Base>
  )
}