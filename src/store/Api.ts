
import qs from "querystring";
import { notifStore } from "./NotifStore";

type Method = "POST" | "GET" | "PUT";

export class Api {

  endpoint = "";

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
      url += `?${qs.stringify(body || {})}`;
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