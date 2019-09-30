import React from "react";
import { Base, BigRow, BigButtonCol, BigCol, FlexCol } from "../components";
import { PageTitle } from "../components/PageTitle";
import { CSSTransition } from "react-transition-group";

import imgFondDiana from "../images/partners/fond_diana.png";
import imgСontextWhite from "../images/partners/context_white.png";
import imgIlimg from "../images/partners/ilim.png";
import imgAstoria from "../images/partners/astoria.png";
import imgGollandia from "../images/partners/new_gollandiya.png";
import imgCinema from "../images/partners/new_cinema.png";
import imgGost from "../images/partners/gost.png";



interface PartnerButtonProps {
  img: string;
  title: string;
  link: string;
}

const height = 300;

const PartnerButton = (props: PartnerButtonProps) => {
  const [ isHover, setHover ] = React.useState(false);

  return (
    <>
      {
        isHover ? null :
        <BigButtonCol 
          onClick={() => {
            window.location.href = props.link;
          }}
          onMouseEnter={() => setHover(true)}
          height={height}>
          {props.title}
        </BigButtonCol>
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
            height={height}
            onMouseLeave={() => setHover(false)}>
            <FlexCol align="center" justify='center'>
              <div 
                onClick={() => {
                  window.location.href = props.link;
                }}
                style={{ 
                  cursor: "pointer",
                  padding: 20
                }}>
                <img
                  height={`${height - 20}px`}
                  width="100%" 
                  src={props.img} 
                />
              </div>
            </FlexCol>
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
      <PageTitle>ПАРТНЕРЫ</PageTitle>
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
        <BigCol className="d-none d-md-block" />
        <PartnerButton 
          link="https://gost-group.ru"
          title="группа копаний GOST"
          img={imgGost}
        />
        <BigCol className="d-none d-md-block" />
      </BigRow>
    </Base>
  )
}