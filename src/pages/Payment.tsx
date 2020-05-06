import React from "react";
import { Base, BigRow, getShadowBoxStyle } from "../components";
import { PageBreadcrumbs } from "../components/PageTitle";
import { Col, Button, Row } from "reactstrap";
import allPaymentsPng from "../images/all-payments.jpg";
import { routerStore } from "../store/RouterStore";

export const PaymentInfo = () => {
  return (
    <>
      <Col style={getShadowBoxStyle({})} className="p-5" md={12}>
        <h5>Правила оплаты и безопасность платежей, конфиденциальность информации</h5>
        <p>
          Оплата банковскими картами осуществляется через АО «АЛЬФА-БАНК».
        </p>
        <p>
          К оплате принимаются карты VISA, MasterCard, МИР.
        </p>
        <p>
          Услуга оплаты через интернет осуществляется в соответствии с Правилами международных платежных систем Visa, MasterCard и Платежной системы МИР на принципах соблюдения конфиденциальности и безопасности совершения платежа, для чего используются самые современные методы проверки, шифрования и передачи данных по закрытым каналам связи. Ввод данных банковской карты осуществляется на защищенной платежной странице АО «АЛЬФА-БАНК».
        </p>
        <p>
          На странице для ввода данных банковской карты потребуется ввести данные банковской карты: номер карты, имя владельца карты, срок действия карты, трёхзначный код безопасности (CVV2 для VISA, CVC2 для MasterCard, Код Дополнительной Идентификации для МИР). Все необходимые данные пропечатаны на самой карте. Трёхзначный код безопасности — это три цифры, находящиеся на обратной стороне карты.
        </p>
        <p>
          Далее вы будете перенаправлены на страницу Вашего банка для ввода кода безопасности, который придет к Вам в СМС. Если код безопасности к Вам не пришел, то следует обратиться в банк выдавший Вам карту.
        </p>

        <Row>
          <Col 
            sm={{
              size: 8,
              offset: 2
            }}
            md={{
              size: 6,
              offset: 3
            }}>
            <img src={allPaymentsPng} width="100%" />
          </Col>
        </Row>
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
                  routerStore.push("/payment/card")
                }}
                color="primary" 
                block>
                оплата банковской картой РФ
              </Button>
            </Col>
            <Col md={6}>
              <Button 
                onClick={() => {
                  routerStore.push("/payment/paypal")
                }}
                color="primary" 
                block>
                оплата PayPal
              </Button>
            </Col>
          </Row>
        </Col>
        <PaymentInfo />
      </BigRow>
    </Base>
  )
}