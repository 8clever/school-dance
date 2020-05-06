import React from "react";
import { Base } from "../components";
import { PageBreadcrumbs } from "../components/PageTitle";
import { routerStore } from "../store/RouterStore";

export const PaymentSuccess = () => {
  return (
    <Base>
      <PageBreadcrumbs items={[
        {
          title: "Оплата",
          url: "/payment"
        },
        {
          title: "Успех"
        }
      ]} />
      <div className="p-5">
        <h3>Оплата прошла успешно.</h3> 
        Ждем Вас на занятиях! Расписание <a href="#" onClick={e => {
          e.preventDefault();
          routerStore.push("/calendar");
        }}>
          https://studiocontext.ru/calendar
        </a>
      </div>
    </Base>
  )
}