import React from "react";
import { Base } from "../components";
import { PageBreadcrumbs } from "../components/PageTitle";
import { executeScript } from "../components/Widget";
import { Row, Col } from "reactstrap";
import { PaymentInfo } from "./Payment";

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
        "data-radario-event-id": "581612",
        "data-custom-name": "Buy online"
      }
    })
  }, []);
  
  return (
    <Base>
      <PageBreadcrumbs 
        items={[
          {
            title: "Оплата",
            url: "/payment"
          },
          {
            title: "Radario"
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