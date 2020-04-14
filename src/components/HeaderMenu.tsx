import React from "react";
import { BigRow, BigButtonColMin, BigCol } from "./Big";
import { routerStore } from "../store/RouterStore";
import { menuStore } from "../store/MenuStore";
import { vk, facebook, instagramm, youtube, whatsapp } from "../static/brands";
import OutsideClickHandler from "react-outside-click-handler";
import { observer } from "mobx-react-lite";
import { DirectionStore } from "../store/DirectionStore";

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

const directionStore = new DirectionStore();

directionStore.loadItems({
  section: "menu"
});

export const HeaderMenu = observer(() => {
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
          onClick={onClick("/news")}
          xs={12}
          md={12}>
          НОВОСТИ
        </BigButtonColMin>
        <BigButtonColMin 
          onClick={onClick("/calendar")}
          xs={12}
          md={12}>
          РАСПИСАНИЕ
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
          ПАРТНЁРЫ
        </BigButtonColMin>

        {
          directionStore.itemList.map(i => {
            return (
              <BigButtonColMin 
                key={i._id as string}
                onClick={onClick(`/directions/${i.url}`)}
                xs={12} 
                md={12}>
                {i.name}
              </BigButtonColMin>
            )
          })
        }

        <BigCol md={12}>
          <div style={{ 
            padding: 30,
            textAlign: "left"
          }}>
            <p>
              Позвоните нам: +7 (812) 602-07-25
              <br />
              <small>
                пн-пт 11:00 - 21:00, сб-вск 14.00-19.00
              </small>
            </p>
            
            <p>
              Напишите нам: contextprostudio@gmail.com
            </p>

            <div style={{ 
              marginTop: 74
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
})