import React from "react";
import { BigRow, BigButtonColMin, BigCol } from "./Big";
import { routerStore } from "../store/RouterStore";
import { menuStore } from "../store/MenuStore";
import { vk, facebook, instagramm, youtube, whatsapp } from "../static/brands";
import OutsideClickHandler from "react-outside-click-handler";

interface BrandLogoProps {
  src: string;
  url?: string;
}

const BrandLogo = (props: BrandLogoProps) => {
  return (
    <img 
      onClick={() => {
        if (props.url) {
          window.location.href = props.url
        }
      }}
      style={{
        cursor: "pointer",
        marginRight: 10
      }}
      width={25} 
      height={25} 
      src={props.src} 
    />
  )
}

export const HeaderMenu = () => {
  const onClick = (path: string) => () => {
    routerStore.push(path);
    menuStore.toggle();
  }

  return (
    <OutsideClickHandler onOutsideClick={(e) => {
      if ((e.target as HTMLElement).className === "close") return;
      menuStore.isCollapsed = true;
    }}>
      <BigRow>
        <BigButtonColMin 
          onClick={onClick("/calendar")}
          xs={12}
          md={12}>
          РАСПИСАНИЕ
        </BigButtonColMin>
        <BigButtonColMin 
          onClick={onClick("/")}
          xs={12}
          md={12}>
          НАПРАВЛЕНИЯ
        </BigButtonColMin>
        <BigButtonColMin 
          onClick={onClick("/subscribe")}
          xs={12}
          md={12}>
          ЦЕНЫ
        </BigButtonColMin>
        <BigButtonColMin 
          onClick={onClick("/studio")}
          xs={12} 
          md={12}>
          СТУДИЯ
        </BigButtonColMin>
        <BigButtonColMin 
          onClick={onClick("/partners")}
          xs={12} 
          md={12}>
          ПАРТНЕРЫ
        </BigButtonColMin>
        <BigButtonColMin 
          onClick={onClick("/contacts")}
          xs={12} 
          md={12}>
          КОНТАКТЫ
        </BigButtonColMin>

        <BigCol md={12}>
          <div style={{ 
            padding: 30,
            textAlign: "left"
          }}>
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
                ответим в течение рабочего дня
              </small>
            </p>

            <div style={{ 
              marginTop: 70
            }}>
              <BrandLogo src={vk.img} url={vk.url} />
              <BrandLogo src={facebook.img} url={facebook.url} />
              <BrandLogo src={instagramm.img} url={instagramm.url} />
              <BrandLogo src={youtube.img} url={youtube.url} />
              <BrandLogo src={whatsapp.img} url={whatsapp.url} />

              <div style={{ float: "right" }}>
                {menuStore.getLocalizedLang(menuStore.lang)}
              </div>
            </div>
          </div>
        </BigCol>
      </BigRow>
    </OutsideClickHandler>
  )
}