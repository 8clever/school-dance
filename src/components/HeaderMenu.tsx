import React from "react";
import { BigRow, BigButtonColMin, BigCol } from "./Big";
import { routerStore } from "../store/RouterStore";
import { userStore } from "../store/UserStore";
import { Icon } from "./Icon";
import { Login } from "./Login";

export const HeaderMenu = () => {
  const [ isVisibleLogin, setIsVisbileLogin ] = React.useState(false);

  return (
    <BigRow>
      <BigButtonColMin 
        onClick={() => routerStore.push("/calendar")}
        xs={12}
        md={12}>
        РАСПИСАНИЕ
      </BigButtonColMin>
      <BigButtonColMin 
        onClick={() => routerStore.push("/")}
        xs={12}
        md={12}>
        НАПРАВЛЕНИЯ
      </BigButtonColMin>
      <BigButtonColMin 
        onClick={() => routerStore.push("/subscribe")}
        xs={12}
        md={12}>
        ЦЕНЫ
      </BigButtonColMin>
      <BigButtonColMin 
        onClick={() => routerStore.push("/studio")}
        xs={12} 
        md={12}>
        СТУДИЯ
      </BigButtonColMin>
      <BigButtonColMin 
        onClick={() => routerStore.push("/partners")}
        xs={12} 
        md={12}>
        ПАРТНЕРЫ
      </BigButtonColMin>
      <BigButtonColMin 
        onClick={() => routerStore.push("/contacts")}
        xs={12} 
        md={12}>
        КОНТАКТЫ
      </BigButtonColMin>

      {
        userStore.user ?
        <BigButtonColMin 
          xs={12} 
          md={12}
          onClick={() => { userStore.logout(); }}>
          Выход <Icon type="sign-out-alt" />
        </BigButtonColMin> :
        <BigButtonColMin 
          xs={12} 
          md={12}
          onClick={() => { setIsVisbileLogin(true) }}>
          Вход <Icon type="sign-in-alt" />
        </BigButtonColMin>
      }

      <BigCol md={12}>
        <div style={{ padding: 30 }}>
          <p>
            Позвоните нам: +7 (812) 602-07-25
            <br />
            <small>
              пн-пт 10:00 - 20:00
            </small>
          </p>
          
          <p>
            Напишите нам: contextprostudio@gmail.com
            <br/>
            <small>
              ответим в течении рабочего дня
            </small>
          </p>
        </div>
      </BigCol>

      <Login 
        visible={isVisibleLogin}
        toggle={() => { setIsVisbileLogin(!isVisibleLogin) }} 
      />
    </BigRow>
  )
}