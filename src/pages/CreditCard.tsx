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
import { I18nText, getI18nText } from "../components/Localization";
import { Select } from "../components/Select";

interface CreditCardProps {
  isSpecialOffer?: boolean;
}

const makeOption = (s: Service) => {
  return {
    label: `${getI18nText(s.name)} ${s.amount} (руб)`,
    value: s._id as string
  }
}


export const CreditCard = observer((props: CreditCardProps) => {

  const serviceStore = React.useMemo(() => new ServiceStore(), []);

  const [ selectedService, setSelectedService ] = React.useState<null | Service>();

  const [ orderId, setOrderId ] = React.useState(new Date().valueOf());

  React.useEffect(() => {
    executeScript({ 
      src: "https://pay2.alfabank.ru/assets/alfa-payment.js",
      id: "alfa-payment-script",
      once: true
    });

    serviceStore.loadItems({}, { id: 1 });
  }, []);

  const services = React.useMemo(() => {
    const services = toJS(serviceStore.itemList, { recurseEverything: true });
    return services.filter(s => !!s.specialOffer === !!props.isSpecialOffer);
  }, [ serviceStore.itemList ]);

  const serviceOptions = React.useMemo(() => {
    return services.map(makeOption);
  }, [ services ]);

  return (
    <Base>
      <PageBreadcrumbs 
        items={[
          {
            title: <I18nText text="Оплата" />,
            url: "/payment"
          },
          {
            title: <I18nText text="Банковская карта РФ" />
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
                <Label>
                  <I18nText text="Укажите фамилию и имя" />
                </Label>
                <Input className="clientInfo" />
              </FormGroup>

              <FormGroup>
                <Label>
                  <I18nText text="Укажите Ваш email" />
                </Label>
                <Input className="clientEmail" />
              </FormGroup>

              <FormGroup>
                <Label>
                  <I18nText text="Выберите услугу" />
                </Label>
                <Select
                  placeholder=""
                  value={selectedService && makeOption(selectedService) || null}
                  onChange={(v: any) => {
                    const service = services.find(s => s._id === v.value);
                    setSelectedService(service);
                  }}
                  options={serviceOptions}
                />
              </FormGroup>

              <input type="hidden" className="orderNumber" value={orderId} />
              <input type="hidden" className="orderDescription" value={selectedService && selectedService.description} />
              <input type="hidden" className="orderAmount" value={selectedService && selectedService.amount} />

              <div 
                onClick={() => {
                  setOrderId(new Date().valueOf());
                }}
                id="alfa-payment-button"
                data-token='ia8sk8h3dh7v4neqbdb3lifs53'
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