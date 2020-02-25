import { decorate, action, toJS } from "mobx";
import { Api } from "./Api";
import { Price } from "../../server/models/Price";

export class PriceStore extends Api<Price> {

  endpoint = "/api/v1/price/"

  save = async () => {
    const price = toJS(this.item);
    if (!price) return;
    return this.editItem(price);
  } 

  create = (_idsubscribe: string) => {
    this.item = {
      _idsubscribe,
      description: "",
      name: ""
    }
  }
}

decorate(PriceStore, {
  create: action,
});

export const priceStore = new PriceStore();