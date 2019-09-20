import React from "react";
import { BigRow, BigCol, BigButtonColMin, BigHr } from "./Big";
import { Col, Row } from "reactstrap";
import { Logo } from "./Logo";
import { Icon } from "./Icon";
import { routerStore } from "../store/RouterStore";

export const Footer = () => {
  return (
    <div className="bg-gray">
      <BigRow>
        <BigButtonColMin onClick={() => routerStore.history.push("/")} md={4}>
          <Logo />
        </BigButtonColMin>
        <Col md={4}>
          <BigRow>
            <BigButtonColMin 
              onClick={() => routerStore.history.push("/studio")}>
              Студия
            </BigButtonColMin>
            <BigButtonColMin>
              Первое посещение
            </BigButtonColMin>
            <BigButtonColMin 
              onClick={() => routerStore.history.push("/partners")}>
              Партнеры
            </BigButtonColMin>
            <BigButtonColMin>
              Направления
            </BigButtonColMin>
            <BigButtonColMin>
              Контакты
            </BigButtonColMin>
            <BigButtonColMin>
              Цены
            </BigButtonColMin>
          </BigRow>
        </Col>
        <Col md={4}>
          <BigRow className="h-100">
            <Col xs={7}>
              <BigButtonColMin className="h-100" xs={12} md={12} h100>
                <Icon type="calendar-alt" size={"2x"} />
              </BigButtonColMin>
            </Col>
            <Col xs={5}>
              <BigRow className="h-50" noGutters>
                <BigButtonColMin 
                  onClick={() => {
                    window.location.href = "https://vk.com/contextpro.studio";
                  }}
                  className="h-100" 
                  xs={6}>
                  <Icon type="vk" sub="b" size="2x" />
                </BigButtonColMin>
                <BigButtonColMin 
                  onClick={() => {
                    window.location.href = "https://www.facebook.com/contextpro.studio/";
                  }}
                  className="h-100" 
                  xs={6}>
                  <Icon type="facebook" sub="b" size="2x" />
                </BigButtonColMin>
              </BigRow>
              <BigRow className="h-50">
                <BigButtonColMin 
                  onClick={() => {
                    window.location.href = "https://www.instagram.com/contextpro.studio/";
                  }}
                  className="h-100" 
                  xs={6}>
                  <Icon type="instagram" sub="b" size="2x" />
                </BigButtonColMin>
                <BigButtonColMin 
                  onClick={() => {
                    window.location.href = "https://wa.me/79319750080"
                  }}
                  className="h-100" 
                  xs={6}>
                  <Icon type="whatsapp" sub="b" size="2x" />
                </BigButtonColMin>
              </BigRow>
            </Col>
          </BigRow>
        </Col>
      </BigRow>
      <BigHr />
    </div>
  )
}