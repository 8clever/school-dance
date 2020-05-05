import React from "react";
import { Base, BigRow, getShadowBoxStyle } from "../components";
import { PageBreadcrumbs } from "../components/PageTitle";
import { PaymentInfo } from "./Payment";
import { Col, Row, FormGroup, Input, Label } from "reactstrap";
import { executeScript } from "../components/Widget";

export const CreditCard = () => {

  React.useEffect(() => {
    executeScript({ 
      src: "https://testpay.alfabank.ru/assets/alfa-payment.js",
      id: "alfa-payment-script",
      once: true
    });
  }, [])

  return (
    <Base>
      <PageBreadcrumbs 
        items={[
          {
            title: "Оплата",
            url: "/payment"
          },
          {
            title: "Банковская карта РФ"
          }
        ]}
      />

      <BigRow>
        <Col md={12} style={getShadowBoxStyle({})} className="p-5">
          
          <Row>
            <Col md={{
              size: 6,
              offset: 3
            }}>
              <FormGroup>
                <Label>Укажите Ваше Имя</Label>
                <Input className="clientInfo" />
              </FormGroup>

              <FormGroup>
                <Label>Укажите Ваш email</Label>
                <Input className="clientEmail" />
              </FormGroup>

              <FormGroup>
                <Label>Номер заказа</Label>
                <Input className="orderNumber" />
              </FormGroup>

              <FormGroup>
                <Label>Описание</Label>
                <Input className="orderDescription" />
              </FormGroup>

              <FormGroup>
                <Label>Сумма к оплате</Label>
                <Input className="orderAmount" />
              </FormGroup>

              <div id="alfa-payment-button"
                data-token='20fgn1shtn3ckob0os3po3ph94'
                data-client-info-selector='.clientInfo'
                data-email-selector='.clientEmail'
                data-amount-selector='.orderAmount'
                data-version='1.0'
                data-order-number-selector='.orderNumber'
                data-language='ru'
                data-stages='1'
                data-return-url='http://store.ru/success_url.html'
                data-fail-url='http://store.ru/fail_url.html'
                data-amount-format='rubli'
                data-description-selector='.orderDescription' 
              />
            </Col>
          </Row>
        </Col>
        <PaymentInfo />
      </BigRow>
    </Base>
  )
}