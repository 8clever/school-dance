import React from "react";
import { Base, BigRow, getShadowBoxStyle } from "../components";
import { PageBreadcrumbs } from "../components/PageTitle";
import { Col, Button, Row } from "reactstrap";
import paymentInfoPng from "../images/payment-info.png";
import { routerStore } from "../store/RouterStore";

export const PaymentInfo = () => {
  return (
    <>
      <Col style={getShadowBoxStyle({})} md={12}>
        <img src={paymentInfoPng} width="100%" />
      </Col>
      <Col style={getShadowBoxStyle({})} className="p-5" md={12}>
        <h5>Контактная информация</h5>
        ООО «СтудияДианыВишневой» <br/>
        ОГРН 1177847152361 <br/>
        ИНН 7801331670 <br/>
        КПП 780101001 <br/>
        Юридический адрес:199004, г.Санкт-Петербург, линия 2-я В.О.,дом 29, оф. 8 р\с  40702810132230002422 в ФИЛИАЛ "САНКТ-ПЕТЕРБУРГСКИЙ" АО "АЛЬФА-БАНК" <br/>
        БИК 044030786 <br/>
        Корр.счет: 30101810600000000786 <br/>
        Генеральный директор Селиневич Константин Эдуардович <br/>
      </Col>
    </>
  )
}

export const Payment = () => {

  return (
    <Base>
      <PageBreadcrumbs items={[
        {
          title: "Оплата"
        }
      ]} />

      <BigRow>
        <Col style={getShadowBoxStyle({})} className="p-5">
          <Row>
            <Col md={6} className="mb-3 mb-md-0">
              <Button 
                onClick={() => {
                  routerStore.push("/payment/paypal")
                }}
                color="primary" 
                block>
                оплата PayPal
              </Button>
            </Col>
            <Col  md={6}>
              <Button color="primary" block>
                оплата банковской картой РФ
              </Button>
            </Col>
          </Row>
        </Col>
        <PaymentInfo />
      </BigRow>
    </Base>
  )
}