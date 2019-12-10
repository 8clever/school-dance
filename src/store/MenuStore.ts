import { decorate, observable, action } from "mobx";

export type lang = "ru";

const langMap = Object.freeze({
  ru: "РУ"
});

export class MenuStore {
  isCollapsed: boolean = true
  lang: lang = "ru";

  toggle = () => {
    this.isCollapsed = !this.isCollapsed;
  }

  getLocalizedLang = (lang: lang) => {
    return langMap[lang];
  }

  setLang = (lang: lang) => {
    this.lang = lang;
  }
}

decorate(MenuStore, {
  isCollapsed: observable,
  lang: observable,
  toggle: action,
  setLang: action
});

export const menuStore = new MenuStore();