import React from "react";
import { Base, BigCol, BigRow, FlexCol } from "../components";
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { Col } from "reactstrap";
import { messages } from "./FirstVisit";
import { useResizeObserver } from "../effects/useResizeObserver";

import phonePNG from "../images/icons/phone-call.png";
import mailPNG from "../images/icons/mail.png";
import pointPNG from "../images/icons/point.png";
import pointBlackPNG from "../images/icons/point-black.png";
import { PageBreadcrumbs } from "../components/PageTitle";
import { I18nText } from "../components/Localization";

export const Contacts = () => {
  let [ width, height, refCallback ] = useResizeObserver();
  if (height < 240) height = 240

  const center = [
    59.929318,
    30.287890
  ]

  return (
    <Base>
      <FlexCol column justify="between">
        <PageBreadcrumbs 
          items={[
            {
              title: 
                <I18nText 
                  text="Контакты"
                />
            }
          ]}
        />

        <BigRow className="h-100">
          <BigCol 
            md={7} 
            lg={8}>
            <div 
              className="h-100 w-100" 
              ref={refCallback}>
              <YMaps>
                <Map 
                  width={width as number}
                  height={height as number}
                  defaultState={{ 
                    center, 
                    zoom: 16
                  }} 
                >
                  <Placemark 
                    options={{
                      iconLayout: 'default#image',
                      iconImageHref:  pointBlackPNG,
                      iconImageSize: [60, 60],
                      iconImageOffset: [-30, -50]
                    }}
                    geometry={center} 
                  />
                </Map>
              </YMaps>
            </div>
          </BigCol>
          <Col
            className="d-md-h-100"
            md={5} 
            lg={4}>
            <BigRow className="d-md-h-100">
              <BigCol md={12}>
                <div style={{ padding: "100px 50px" }}>
                  <img height={15} src={phonePNG} /> +7 (812) 602-07-25
                  <br/>
                  <br/>
                  <img height={15} src={mailPNG} /> contextprostudio@gmail.com
                  <br/>
                  <br/>
                  <img height={15} src={pointPNG} /> <I18nText text="Наб. Адмиралтейского канала д.2, здание Бутылка, 3 этаж" />
                  <br/>
                  <br/>
                  <small>
                    <I18nText text="Санкт-Петербург, Россия, 190000" />
                  </small>
                </div>
              </BigCol>
              <BigCol md={12}>
                <div style={{ padding: "100px 50px" }}>
                  {messages[1].desc.map((d, idx) => {
                    return (
                      <p key={idx}>
                        <I18nText text={d} />
                      </p>
                    )
                  })}
                </div>
              </BigCol>
            </BigRow>
          </Col>
        </BigRow>
      </FlexCol>
    </Base>
  )
}