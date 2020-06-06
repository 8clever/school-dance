import { i18n } from "../../server/models/I18n";
import { Api } from "./Api";
import { decorate, observable, action } from "mobx";

class I18nStore extends Api<i18n.Localization> {

  endpoint = "/api/v1/localization/"

  lang: i18n.Lang = i18n.Lang.ru

  translates: {[key: string]: i18n.Localization["tr"]} = {}

  loadLocalization = async () => {
    const items = await this.getItems({});
    this.translates = items.list.reduce((memo, locale) => {
      memo[locale.key] = locale.tr;
      return memo;
    }, {});
  }
}

decorate(I18nStore, {
  lang: observable,

  translates: observable,

  loadLocalization: action
})

export const i18nStore = new I18nStore();