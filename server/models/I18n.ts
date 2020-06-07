import { ObjectID } from "mongodb";

export namespace i18n {
  
  export enum Lang {
    en = "en",
    ru = "ru"
  }

  export enum Languages {
    en = "EN",
    ru = "РУ"
  }

  export const defaultLang = Lang.ru;

  export const langs = Object.keys(i18n.Lang) as Lang[];

  export interface Localization {
    _id?: string | ObjectID;
    key: string;
    tr: {
      [key in Lang]?: string
    }
  }
}