
import qs from "querystring";
import { notifStore } from "./NotifStore";
import _ from "lodash";
import { RootQuerySelector, FilterQuery } from "mongodb";
import { decorate, observable, action } from "mobx";

type Method = "POST" | "GET" | "PUT";

export class Api<T> {

  item?: T;
  itemList: T[] = [];
  endpoint = "";

  stringifyQuery = (obj: object) => {
    if (!obj) return;

    const nested = Object.keys(obj).reduce((memo, k) => {
      if (_.isArray(obj[k]) || _.isPlainObject(obj[k])) {
        memo[k] = `json_${JSON.stringify(obj[k])}`;
      } else {
        memo[k] = obj[k];
      }
      return memo;
    }, {});

    return qs.stringify(nested);
  }

  editItem = async (item: T): Promise<string> => {
    return this.fetch("editItem", "POST", item);
  }

  getItems = async (query: RootQuerySelector<T>, sort?: object): Promise<{ list: T[], count: number }> => {
    return this.fetch("items", "GET", { query, sort });
  }

  loadItem = async (_id?: string) => {
    if (!_id) return;

    const data = await this.getItems({ _id });
    if (data.count) {
      this.item = data.list[0];
    }
  }

  loadItems = async (query?: FilterQuery<T>, sort?: object) => {
    const data = await this.getItems(query, sort);
    this.itemList = data.list;
  }

  removeItem = async (query: RootQuerySelector<T>) => {
    return this.fetch("rmItem", "GET", query);
  }

  removeItemByID = async (_id: string) => {
    return this.removeItem({ _id });
  }

  fetch = async (apiName: string, method: Method, body?: any) => {
    let url = this.endpoint + apiName;

    const fetchProps: RequestInit = {
      method,
      credentials: 'same-origin',
      headers: {
        "Token": sessionStorage.getItem("token")
      }
    }

    if (method === "GET") {
      url += `?${this.stringifyQuery(body)}`;
    }

    if (method === "POST") {
      fetchProps.headers['Content-Type'] = 'application/json';
      fetchProps.body = JSON.stringify(body);
    }

    if (method === "PUT" && body instanceof FormData) {
      fetchProps.body = body;
    }

    const response = await fetch(url, fetchProps);
    const data = await response.json();
    if (!data) return null;

    if (data.errors && data.errors.length) {
      const errors = data.errors as Error[];
      notifStore.addNotif({
        title: "Ошибка",
        message: errors[0].message,
        duration: 5
      });
      throw new Error(errors[0].message);
    }

    return data;
  }
}

decorate(Api, {
  item: observable,
  itemList: observable,
  loadItem: action,
  loadItems: action
})