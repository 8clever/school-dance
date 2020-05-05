import React from "react";
import { Base, BigRow, getShadowBoxStyle } from "../components";
import { PageBreadcrumbs } from "../components/PageTitle";
import { PaymentInfo } from "./Payment";
import { executeScript } from "../components/Widget";
import { Col } from "reactstrap";

export const PayPal = () => {

  React.useEffect(() => {
    executeScript({
      src: "https://www.paypal.com/sdk/js?client-id=sb&currency=RUB", 
      onload: () => {
        (window => {
          window.paypal.Buttons({
            style: {
              shape: 'rect',
              color: 'blue',
              layout: 'horizontal',
              label: 'paypal',
            },
            createOrder: function(data, actions) {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                    value: '300'
                  }
                }]
              });
            },
            onApprove: function(data, actions) {
              return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name + '!');
              });
            }
          }).render('#paypal-button-container');
        })(window as any)
      },
      once: true,
      dataset: {
        "data-sdk-integration-source": 'button-factory'
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
            title: "PayPal"
          }
        ]}
      />

      <BigRow>
        <Col style={getShadowBoxStyle({})} className="p-5">
          <div id="paypal-button-container" />
        </Col>
        <PaymentInfo />
      </BigRow>
    </Base>
  )
}