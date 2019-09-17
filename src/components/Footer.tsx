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
            <BigButtonColMin>Студия</BigButtonColMin>
            <BigButtonColMin>Первое посещение</BigButtonColMin>
            <BigButtonColMin>Партнеры</BigButtonColMin>
            <BigButtonColMin>Направления</BigButtonColMin>
            <BigButtonColMin>Контакты</BigButtonColMin>
            <BigButtonColMin>Цены</BigButtonColMin>
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
                <BigButtonColMin className="h-100" xs={6}>
                  <Icon type="vk" sub="b" size="2x" />
                </BigButtonColMin>
                <BigButtonColMin className="h-100" xs={6}>
                  <Icon type="facebook" sub="b" size="2x" />
                </BigButtonColMin>
              </BigRow>
              <BigRow className="h-50">
                <BigButtonColMin className="h-100" xs={6}>
                  <Icon type="instagram" sub="b" size="2x" />
                </BigButtonColMin>
                <BigButtonColMin className="h-100" xs={6}>
                  <Icon type="youtube" sub="b" size="2x" />
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