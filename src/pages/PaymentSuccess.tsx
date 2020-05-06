import React from "react";
import { routerStore } from "../store/RouterStore";

export const PaymentSuccess = () => {
  return (
    <div className="p-5">
      <h3>Оплата прошла успешно.</h3> 
      Ждем Вас на занятиях! Расписание <a href="#" onClick={e => {
        e.preventDefault();
        routerStore.push("/calendar");
      }}>
        https://studiocontext.ru/calendar
      </a>
    </div>
  )
}