
import qs from "querystring";
import { notifStore } from "./NotifStore";
import _ from "lodash";

type Method = "POST" | "GET" | "PUT";

export class Api {

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