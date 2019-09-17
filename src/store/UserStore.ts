import { decorate, observable, action } from "mobx";
import { User } from "../../server/models/User";
import { notifStore } from "./NotifStore";
import { Api } from "./Api";

export class UserStore extends Api {
  user?: User;

  endpoint = "/api/v1/user/"

  login = async (login: string, password: string): Promise<string> => {
    const data = await this.fetch("login", "POST", {
      login,
      password
    });
    return data as string;
  }
}

decorate(UserStore, {
  user: observable,
  login: action
});

export const userStore = new UserStore;