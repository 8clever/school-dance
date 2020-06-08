import React from "react";
import { Base, BigRow, getShadowBoxStyle } from "../components";
import { PageBreadcrumbs } from "../components/PageTitle";
import { Col, Button, Row } from "reactstrap";
import allPaymentsPng from "../images/all-payments.jpg";
import { routerStore } from "../store/RouterStore";
import { I18nText } from "../components/Localization";

export const PaymentInfo = () => {

  return (
    <>
      <Col style={getShadowBoxStyle({})} className="p-5" md={12}>
        <h5>
          <I18nText text="Правила оплаты и безопасность платежей, конфиденциальность информации" />
        </h5>
        <p>
          <I18nText text="Оплата банковскими картами осуществляется через АО «АЛЬФА-БАНК»." />
        </p>
        <p>
          <I18nText text="К оплате принимаются карты VISA, MasterCard, МИР." />
        </p>
        <p>
          <I18nText text="Услуга оплаты через интернет осуществляется в соответствии с Правилами международных платежных систем Visa, MasterCard и Платежной системы МИР на принципах соблюдения конфиденциальности и безопасности совершения платежа, для чего используются самые современные методы проверки, шифрования и передачи данных по закрытым каналам связи. Ввод данных банковской карты осуществляется на защищенной платежной странице АО «АЛЬФА-БАНК»." />
        </p>
        <p>
          <I18nText text="На странице для ввода данных банковской карты потребуется ввести данные банковской карты: номер карты, имя владельца карты, срок действия карты, трёхзначный код безопасности (CVV2 для VISA, CVC2 для MasterCard, Код Дополнительной Идентификации для МИР). Все необходимые данные пропечатаны на самой карте. Трёхзначный код безопасности — это три цифры, находящиеся на обратной стороне карты." />
        </p>
        <p>
          <I18nText text="Далее вы будете перенаправлены на страницу Вашего банка для ввода кода безопасности, который придет к Вам в СМС. Если код безопасности к Вам не пришел, то следует обратиться в банк выдавший Вам карту." />
        </p>
        <p>
          <I18nText text="Случаи отказа в совершении платежа:" />
          <ul>
            <li>
              <I18nText text="банковская карта не предназначена для совершения платежей через интернет, о чем можно узнать, обратившись в Ваш Банк" />
            </li>
            <li>
              <I18nText text="недостаточно средств для оплаты на банковской карте. Подробнее о наличии средств на банковской карте Вы можете узнать, обратившись в банк, выпустивший банковскую карту" />
            </li>
            <li>
              <I18nText text="данные банковской карты введены неверно" />
            </li>
            <li>
              <I18nText 
                text="истек срок действия банковской карты. Срок действия карты, как правило, указан на лицевой стороне карты (это месяц и год, до которого действительна карта). Подробнее о сроке действия карты Вы можете узнать, обратившись в банк, выпустивший банковскую карту"
              />
            </li>
          </ul>
          <I18nText text="По вопросам оплаты с помощью банковской карты и иным вопросам, связанным с работой сайта, Вы можете обращаться по следующим телефонам: 8 (931) 975-00-80. Предоставляемая вами персональная информация (имя, адрес, телефон, e-mail, номер банковской карты) является конфиденциальной и не подлежит разглашению. Данные вашей кредитной карты передаются только в зашифрованном виде и не сохраняются на нашем Web-сервере." />
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
        <h5>
          <I18nText text="Правила возврата денежных средств" />
        </h5>
        <p>
          <I18nText text="При оплате картами возврат наличными денежными средствами не допускается. Порядок возврата регулируется правилами международных платежных систем." />
          <I18nText text="Процедура возврата регламентируется статьей 26.1 федерального закона «О защите прав потребителей»." />
          <I18nText text="Потребитель вправе отказаться от услуги в любое время до ее оказания. Потребитель не вправе отказаться от оказанной услуги." />
        </p>
        <p>
          <I18nText text="Для возврата денежных средств на банковскую карту необходимо заполнить «Заявление о возврате денежных средств», которое высылается по требованию компанией на электронный адрес и оправить его вместе с приложением копии паспорта по адресу contextprostudio@gmail.com"/>
          <I18nText text="Возврат денежных средств будет осуществлен на банковскую карту в течение 21 (двадцати одного) рабочего дня со дня получения «Заявление о возврате денежных средств» Компанией." />
        </p>
        <p>
          <I18nText text="Для возврата денежных средств по операциям проведенным с ошибками необходимо обратиться с письменным заявлением и приложением копии паспорта и чеков/квитанций, подтверждающих ошибочное списание. Данное заявление необходимо направить по адресу contextprostudio@gmail.com" />
        </p>
        <p>
          <I18nText text="Сумма возврата будет равняться сумме покупки. Срок рассмотрения Заявления и возврата денежных средств начинает исчисляться с момента получения Компанией Заявления и рассчитывается в рабочих днях без учета праздников/выходных дней." />
        </p>
      </Col>
      <Col style={getShadowBoxStyle({})} className="p-5" md={12}>
        <h5>
          <I18nText text="Правила оказания услуги" />
        </h5>
        <p>
          <I18nText text="Для получения оплаченных услуг необходимо записаться на занятие по ссылке https://studiocontext.ru/calendar или связаться с продавцом по телефону 8 (931) 975-00-80. Сроки оказания услуг определяются выбором соответствующей услуги (список услуг и сроки оказания https://studiocontext.ru/calendar)"/>
        </p>
      </Col>
      <Col style={getShadowBoxStyle({})} className="p-5" md={12}>
        <h5>
          <I18nText text="Контактная информация" />
        </h5>
        <I18nText text="ООО «СтудияДианыВишневой»"/> <br/>
        <I18nText text="ОГРН: 1177847152361"/> <br/>
        <I18nText text="ИНН: 7801331670"/> <br/>
        <I18nText text="КПП: 780101001"/> <br/>
        <I18nText text="Фактический адрес: Санкт-Петербург, наб. Адмиралтейского канала, 2, Остров Новая Голландия, здание Бутылка, 3 этаж"/> <br />
        <I18nText text="Телефон: 8 (812) 602-07-25"/> <br />
        <I18nText text="Почта: contextprostudio@gmail.com"/> <br />
        <I18nText text="Генеральный директор: Селиневич Константин Эдуардович"/> <br/>
      </Col>
    </>
  )
}

export const Payment = () => {

  return (
    <Base>
      <PageBreadcrumbs items={[
        {
          title: <I18nText text="Оплата" />
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
                <I18nText text="Оплата банковской картой РФ" />
              </Button>
            </Col>
            <Col md={6}>
              <Button 
                onClick={() => {
                  routerStore.push("/payment/radario")
                }}
                color="primary" 
                block>
                <I18nText text="PAY" />
              </Button>
            </Col>
          </Row>
        </Col>
        <PaymentInfo />
      </BigRow>
    </Base>
  )
}