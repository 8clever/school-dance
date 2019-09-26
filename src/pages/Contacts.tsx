import React from "react";
import { Base, BigCol, BigRow, FlexCol, Icon } from "../components";
import { PageTitle } from "../components/PageTitle";
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { Col } from "reactstrap";
import { messages } from "./FirstVisit";

export const Contacts = () => {
  const [rect, setRect] = React.useState();
  const mapRef = React.useRef<HTMLDivElement>();

  React.useLayoutEffect(() => {
    const rect = mapRef.current.getBoundingClientRect() as DOMRect;
    if (rect.height < 240) rect.height = 240;
    setRect(rect);
  }, []);

  const center = [
    59.929318,
    30.287890
  ]
  
  return (
    <Base>
      <PageTitle>КОНТАКТЫ</PageTitle>
      <BigRow>
        <BigCol 
          md={7} 
          lg={8}>
          <div 
            className="h-100 w-100" 
            ref={mapRef}>
            {
              rect ?
              <YMaps>
                <Map 
                  width={rect.width}
                  height={rect.height}
                  defaultState={{ 
                    center, 
                    zoom: 16
                  }} 
                >
                  <Placemark 
                    options={{
                      iconColor: "black",
                      iconContent: ""
                    }}
                    geometry={center} 
                  />
                </Map>
              </YMaps> : null
            }
          </div>
        </BigCol>
        <Col
          md={5} 
          lg={4}>
          <BigRow>
            <BigCol md={12}>
              <div style={{ padding: "100px 50px" }}>
                <Icon type="phone" /> +7 (812) 601-07-25
                <br/>
                <br/>
                <Icon type="envelope" /> contextprostudio@gmail.com
                <br/>
                <br/>
                <Icon type="map-marker-alt" /> Наб. Адмиралтейского канала д.2, здание Бутылка, 3 этаж
                <br/>
                <br/>
                <small>
                  Санкт-Петербург, Россия, 190000
                </small>
              </div>
            </BigCol>
            <BigCol md={12}>
              <div style={{ padding: "100px 50px" }}>
                {messages[1].desc.map((d, idx) => {
                  return (
                    <p key={idx}>{d}</p>
                  )
                })}
              </div>
            </BigCol>
          </BigRow>
        </Col>
      </BigRow>
    </Base>
  )
}