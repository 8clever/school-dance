
import qs from "querystring";
import { notifStore } from "./NotifStore";

type Method = "POST" | "GET";

export class Api {

  endpoint = "";

  fetch = async (apiName: string, method: Method, body: any) => {
    let url = this.endpoint + apiName;

    const fetchProps: RequestInit = {
      method,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (method === "GET") {
      url += `?${qs.stringify(body)}`;
    } 

    if (method === "POST") {
      fetchProps.body = JSON.stringify(body);
    }

    const response = await fetch(url, fetchProps);
    const data = await response.json();
    
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