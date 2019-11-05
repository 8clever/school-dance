import React from "react";
import { BigRow, BigButtonColMin, BigHr } from "./Big";
import { Col } from "reactstrap";
import { Logo } from "./Logo";
import { routerStore } from "../store/RouterStore";
import { url as brandURL } from "../static/brands";

import scheduleSVG from "../images/icons/schedule.svg";
import youtubeSVG from "../images/icons/youtube.svg";
import vkSVG from "../images/icons/vk.svg";
import instagrammSVG from "../images/icons/instagramm.svg";
import facebookSVG from "../images/icons/facebook.svg";

interface FooterBrandLogoProps {
  src: string;
  url: string;
}

const FooterBrandLogo = (props: FooterBrandLogoProps) => {
  return (
    <BigButtonColMin 
      onClick={() => {
        window.location.href = props.url;
      }}
      className="h-100" 
      xs={6}>
      <img 
        width={30} 
        height={30} 
        src={props.src} 
      />
    </BigButtonColMin>
  )
}

export const Footer = () => {
  return (
    <div className="bg-gray">
      <BigRow>
        <BigButtonColMin onClick={() => routerStore.push("/")} md={4}>
          <Logo width={250} />
        </BigButtonColMin>
        <Col md={4}>
          <BigRow>
            <BigButtonColMin 
              onClick={() => routerStore.push("/studio")}>
              Студия
            </BigButtonColMin>
            <BigButtonColMin onClick={() => {
              routerStore.push("/firstvisit")
            }}>
              Первое посещение
            </BigButtonColMin>
            <BigButtonColMin 
              onClick={() => routerStore.push("/partners")}>
              Партнеры
            </BigButtonColMin>
            <BigButtonColMin onClick={() => {
              routerStore.push("/")
            }}>
              Направления
            </BigButtonColMin>
            <BigButtonColMin  
              onClick={() => routerStore.push("/contacts")}>
              Контакты
            </BigButtonColMin>
            <BigButtonColMin
              onClick={() => routerStore.push("/subscribe")}>
              Цены
            </BigButtonColMin>
          </BigRow>
        </Col>
        <Col md={4}>
          <BigRow className="h-100">
            <BigButtonColMin 
              onClick={() => {
                routerStore.push("/calendar")
              }}
              className="h-100" 
              xs={7} 
              md={7} 
              h100>
              <img src={scheduleSVG} />
            </BigButtonColMin>
            <Col xs={5}>
              <BigRow className="h-50" noGutters>
                <FooterBrandLogo 
                  src={vkSVG}
                  url={brandURL.vk}
                />
                <FooterBrandLogo 
                  src={facebookSVG}
                  url={brandURL.facebook}
                />
              </BigRow>
              <BigRow className="h-50">
                <FooterBrandLogo 
                  src={instagrammSVG}
                  url={brandURL.instagramm}
                />
                <FooterBrandLogo 
                  src={youtubeSVG}
                  url={brandURL.youtube}
                />
              </BigRow>
            </Col>
          </BigRow>
        </Col>
        <BigButtonColMin 
          onClick={() => {
            window.open("/rules_policies.pdf", "_blank")
          }}
          md={12}>
          Правила студии и политика конфиденциальности
        </BigButtonColMin>
      </BigRow>
      <BigHr />
    </div>
  )
}