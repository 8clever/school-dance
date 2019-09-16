import { decorate, observable, action } from "mobx";
import { User } from "../../server/models/User";
import { notifStore } from "./NotifStore";

export class UserStore {
  user?: User;

  endpoint = "/api/v1/user/"

  login = async (login: string, password: string): Promise<string | Error[]> => {
    const response = await fetch(this.endpoint + "login", {
      method: "POST",
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login,
        password
      })
    });
    const data = await response.json();
    if (data.errors && data.errors.length) {
      return data.errors as Error[];
    }
    return data as string;
  }
}

decorate(UserStore, {
  user: observable,
  login: action
});

export const userStore = new UserStore;