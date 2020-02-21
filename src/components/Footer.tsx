import React from "react";
import { BigRow, BigButtonColMin, BigHr, BigButtonCol } from "./Big";
import { Col } from "reactstrap";
import { Logo } from "./Logo";
import { routerStore } from "../store/RouterStore";

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
        height={35} 
        src={props.src} 
      />
    </BigButtonColMin>
  )
}

export const Footer = () => {
  return (
    <div className="bg-gray">
      <BigRow>
        <Col md={4}>
          <BigRow className="h-100">
            <Col 
              xs={6}
              md={6}>
              <BigRow 
                className="h-100">
                <BigButtonColMin 
                  className="h-50"
                  md={12}
                  onClick={() => routerStore.push("/partners")}>
                  Партнеры
                </BigButtonColMin>
                <BigButtonColMin 
                  className="h-50"
                  md={12}
                  onClick={() => {
                    routerStore.push("/contacts")
                  }}>
                  Контакты
                </BigButtonColMin>
              </BigRow>
            </Col>
            <BigButtonColMin 
              onClick={() => {
                routerStore.push("/firstvisit")
              }}
              className="h-100" 
              xs={6} 
              md={6} 
              h100>
              ПЕРВОЕ ПОСЕЩЕНИЕ
            </BigButtonColMin>
          </BigRow>
        </Col>
        <Col md={4}>
          <BigRow className="h-100">
            <BigButtonColMin 
              onClick={() => {
                routerStore.push("/signup")
              }}
              className="h-100" 
              xs={7} 
              md={7} 
              h100>
              ЗАПИСАТЬСЯ
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
        <BigButtonCol
          className="d-none d-md-block"
          onClick={() => routerStore.push("/")} md={4}>
          <Logo width={250} />
        </BigButtonCol>
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