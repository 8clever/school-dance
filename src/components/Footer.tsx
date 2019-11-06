import React from "react";
import { BigRow, BigButtonColMin, BigHr } from "./Big";
import { Col } from "reactstrap";
import { Logo } from "./Logo";
import { routerStore } from "../store/RouterStore";

import schedulePNG from "../images/icons/schedule.png";
import { vk, facebook, instagramm, youtube } from "../static/brands";

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
        width={35} 
        height={27} 
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
              <img 
                height={35}
                width={45}
                src={schedulePNG} /
              >
            </BigButtonColMin>
            <Col xs={5}>
              <BigRow className="h-50" noGutters>
                <FooterBrandLogo 
                  src={vk.img}
                  url={vk.url}
                />
                <FooterBrandLogo 
                  src={facebook.img}
                  url={facebook.url}
                />
              </BigRow>
              <BigRow className="h-50">
                <FooterBrandLogo 
                  src={instagramm.img}
                  url={instagramm.url}
                />
                <FooterBrandLogo 
                  src={youtube.img}
                  url={youtube.url}
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