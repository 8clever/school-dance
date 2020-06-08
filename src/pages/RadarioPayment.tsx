import React from "react";
import { Base } from "../components";
import { PageBreadcrumbs } from "../components/PageTitle";
import { executeScript } from "../components/Widget";
import { Row, Col } from "reactstrap";
import { PaymentInfo } from "./Payment";
import { I18nText } from "../components/Localization";

const $container = document.createElement("div");

export const RadarioPayment = () => {

  React.useEffect(() => {
    document.getElementById("radario-button").append($container);
    if ($container.childElementCount) return;
    executeScript({
      src: "https://radario.ru/scripts/widget/buy-button-widget.js",
      container: $container,
      dataset: {
        "data-class": "radarioButtonScript",
        "data-radario-event-id": "581815",
        "data-custom-name": "BUY ONLINE"
      }
    })
  }, []);
  
  return (
    <Base>
      <PageBreadcrumbs 
        items={[
          {
            title: <I18nText text="Оплата" />,
            url: "/payment"
          },
          {
            title: <I18nText text="Radario" />
          }
        ]}
      />

      <Row>
        <Col md={12} className="p-5">
          <div id="radario-button"></div>
        </Col>
        <PaymentInfo />
      </Row>
    </Base>
  )
}