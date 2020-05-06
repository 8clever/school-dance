import React from "react";
import { Base, BigRow, getShadowBoxStyle } from "../components";
import { PageBreadcrumbs } from "../components/PageTitle";
import { PaymentInfo } from "./Payment";
import { Col, Row, FormGroup, Input, Label } from "reactstrap";
import { executeScript } from "../components/Widget";
import { ServiceStore } from "../store/ServiceStore";
import { Service } from "../../server/models/Service";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

export const CreditCard = observer(() => {

  const serviceStore = React.useMemo(() => new ServiceStore(), []);

  const [ selectedService, setSelectedService ] = React.useState<null | Service>();

  React.useEffect(() => {
    executeScript({ 
      src: "https://testpay.alfabank.ru/assets/alfa-payment.js",
      id: "alfa-payment-script",
      once: true
    });

    serviceStore.loadItems({}, { name: 1 });
  }, []);

  const services = React.useMemo(() => {
    return toJS(serviceStore.itemList, { recurseEverything: true });
  }, [ serviceStore.itemList ]);

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
                <Label>Услуга</Label>
                <Input 
                  value={selectedService && selectedService._id as string}
                  onChange={e => {
                    const service = services.find(s => s._id === e.target.value);
                    setSelectedService(service);
                  }}
                  type="select">
                  <option>Не выбрано</option>
                  {services.map((s) => {
                    return (
                      <option key={s._id as string} value={s._id as string}>
                        #{s.id} {s.name} {s.amount} (руб)
                      </option>
                    )
                  })}
                </Input>
              </FormGroup>

              <input type="hidden" className="orderNumber" value={new Date().valueOf()} />
              <input type="hidden" className="orderDescription" value={selectedService && selectedService.description} />
              <input type="hidden" className="orderAmount" value={selectedService && selectedService.amount} />

              <div id="alfa-payment-button"
                data-token='20fgn1shtn3ckob0os3po3ph94'
                data-client-info-selector='.clientInfo'
                data-email-selector='.clientEmail'
                data-amount-selector='.orderAmount'
                data-version='1.0'
                data-order-number-selector='.orderNumber'
                data-language='ru'
                data-stages='1'
                data-return-url='https://studiocontext.ru/payment/success'
                data-fail-url='https://studiocontext.ru/payment/fail'
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
})