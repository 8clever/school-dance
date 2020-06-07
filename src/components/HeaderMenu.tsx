import React from "react";
import { BigRow, BigButtonColMin, BigCol } from "./Big";
import { routerStore } from "../store/RouterStore";
import { menuStore } from "../store/MenuStore";
import { vk, facebook, instagramm, youtube, whatsapp } from "../static/brands";
import OutsideClickHandler from "react-outside-click-handler";
import { observer } from "mobx-react-lite";
import { DirectionStore } from "../store/DirectionStore";
import { i18nStore } from "../store/i18nStore";
import { i18n } from "../../server/models/I18n";
import { userStore } from "../store/UserStore";
import { I18nText } from "./Localization";

interface BrandLogoProps {
  src: string;
  url?: string;
}

const BrandLogo = (props: BrandLogoProps) => {
  return (
    <img 
      width={25}
      height={25}
      className="brand-logo"
      src={props.src} 
      onClick={() => {
        if (props.url) {
          window.location.href = props.url
        }
      }}
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
          <I18nText 
            text="НОВОСТИ"
          />
        </BigButtonColMin>
        <BigButtonColMin 
          onClick={onClick("/firstvisit")}
          xs={12}
          md={12}>
          <I18nText 
            text="ПЕРВОЕ ПОСЕЩЕНИЕ"
          />
        </BigButtonColMin>
        <BigButtonColMin 
          onClick={onClick("/studio")}
          xs={12} 
          md={12}>
          <I18nText 
            text="СТУДИЯ"
          />
        </BigButtonColMin>
        <BigButtonColMin 
          onClick={onClick("/partners")}
          xs={12} 
          md={12}>
          <I18nText 
            text="ПАРТНЁРЫ"
          />
        </BigButtonColMin>

        {
          directionStore.itemList.map(i => {
            return (
              <BigButtonColMin 
                key={i._id as string}
                onClick={onClick(`/directions/${i.url}`)}
                xs={12} 
                md={12}>
                <I18nText 
                  text={i.name}
                />
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
              <I18nText 
                text="Позвоните нам: +7 (812) 602-07-25"
              />
              <br />
              <small>
                <I18nText 
                  text="пн-пт 11:00 - 21:00, сб-вск 14.00-19.00"
                />
              </small>
            </p>
            
            <p>
              <I18nText 
                text="Напишите нам: contextprostudio@gmail.com"
              />
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

                <a 
                  href=""
                  onClick={e => {
                    e.preventDefault();
                    const idx = i18n.langs.findIndex(i => i === i18nStore.lang);
                    const nextIdx = idx + 1;
                    const lang = i18n.langs[nextIdx] || i18n.langs[0];
                    i18nStore.setLang(lang);
                  }}>
                  {i18n.Languages[i18nStore.lang]}
                </a>

                {
                  userStore.isAdmin() ?
                  <a 
                    href=""
                    className="ml-2"
                    onClick={e => {
                      e.preventDefault();
                      i18nStore.toggleMode();
                    }}
                    style={{ float: "right" }}>
                    {i18nStore.mode}
                  </a> : null
                }
              </div>
            </div>
          </div>
        </BigCol>
      </BigRow>
    </OutsideClickHandler>
  )
})