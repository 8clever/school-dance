import React from "react";
import { Base, BigRow, BigButtonCol, BigCol, FlexCol } from "../components";
import { PageTitle } from "../components/PageTitle";

import imgFondDiana from "../images/partners/fond_diana.png";
import imgСontextWhite from "../images/partners/context_white.png";
import imgIlimg from "../images/partners/ilim.png";
import imgAstoria from "../images/partners/astoria.png";
import imgGollandia from "../images/partners/new_gollandiya.png";
import imgCinema from "../images/partners/new_cinema.png";
import { CSSTransition } from "react-transition-group";

interface PartnerButtonProps {
  img: string;
  title: string;
}

const PartnerButton = (props: PartnerButtonProps) => {
  const [ isHover, setHover ] = React.useState(false);

  return (
    <>
      {
        isHover ? null :
        <BigButtonCol 
          onMouseEnter={() => setHover(true)}
          padding={"150px 60px"} >
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
            onMouseLeave={() => setHover(false)}>
            <FlexCol align="center" justify='center'>
              <div style={{ padding: 20 }}>
                <img width="100%" src={props.img} />
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
      <BigRow>
        <PartnerButton 
          title="ФОНД ДИАНЫ ВИШНЁВОЙ"
          img={imgFondDiana}
        />
        <PartnerButton 
          title="ФЕСТИВАЛЬ CONTEXT"
          img={imgСontextWhite}
        />
        <PartnerButton 
          title="ГРУППА КОМПАНИЙ ИЛИМ"
          img={imgIlimg}
        />
        <PartnerButton 
          title="Отель Астория"
          img={imgAstoria}
        />
        <PartnerButton 
          title="Новая Голландия"
          img={imgGollandia}
        />
        <PartnerButton 
          title="Новая Сцена Александрийского театра"
          img={imgCinema}
        />
      </BigRow>
    </Base>
  )
}