import React from "react";
import { BigRow, BigButtonColMin, BigCol } from "./Big";
import { routerStore } from "../store/RouterStore";
import { userStore } from "../store/UserStore";
import { Login } from "./Login";
import { menuStore } from "../store/MenuStore";
import { url as brandURL } from "../static/brands";

import vk from "../images/icons/vk.svg"
import whatsapp from "../images/icons/instagramm.svg"
import youtube from "../images/icons/youtube.svg"
import instagramm from "../images/icons/instagramm.svg"
import facebook from "../images/icons/facebook.svg"

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
        marginRight: 5
      }}
      width={15} 
      height={15} 
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
            marginTop: 70,
            display: "flex" 
          }}>
            <BrandLogo src={vk} url={brandURL.vk} />
            <BrandLogo src={facebook} url={brandURL.facebook} />
            <BrandLogo src={instagramm} url={brandURL.instagramm} />
            <BrandLogo src={youtube} url={brandURL.youtube} />
            <BrandLogo src={whatsapp} url={brandURL.whatsapp} />
          </div>
        </div>
      </BigCol>
    </BigRow>
  )
}