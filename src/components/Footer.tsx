import React from "react";
import { BigRow, BigButtonColMin, BigHr } from "./Big";
import { Col } from "reactstrap";
import { Logo } from "./Logo";
import { routerStore } from "../store/RouterStore";

import scheduleSVG from "../images/icons/schedule.svg";
import whatsappSVG from "../images/icons/whatsapp-logo.svg";
import vkSVG from "../images/icons/vk.svg";
import instagrammSVG from "../images/icons/instagramm.svg";
import facebookSVG from "../images/icons/facebook.svg";

const iconStyle = {
  width: 30,
  height: 30
}

export const Footer = () => {
  return (
    <div className="bg-gray">
      <BigRow>
        <BigButtonColMin onClick={() => routerStore.push("/")} md={4}>
          <Logo />
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
                <BigButtonColMin 
                  onClick={() => {
                    window.location.href = "https://vk.com/contextpro.studio";
                  }}
                  className="h-100" 
                  xs={6}>
                  <img {...iconStyle} src={vkSVG} />
                </BigButtonColMin>
                <BigButtonColMin 
                  onClick={() => {
                    window.location.href = "https://www.facebook.com/contextpro.studio/";
                  }}
                  className="h-100" 
                  xs={6}>
                  <img {...iconStyle} src={facebookSVG} />
                </BigButtonColMin>
              </BigRow>
              <BigRow className="h-50">
                <BigButtonColMin 
                  onClick={() => {
                    window.location.href = "https://www.instagram.com/contextpro.studio/";
                  }}
                  className="h-100" 
                  xs={6}>
                  <img {...iconStyle} src={instagrammSVG} />
                </BigButtonColMin>
                <BigButtonColMin 
                  onClick={() => {
                    window.location.href = "https://wa.me/79319750080"
                  }}
                  className="h-100" 
                  xs={6}>
                  <img {...iconStyle} src={whatsappSVG} />
                </BigButtonColMin>
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