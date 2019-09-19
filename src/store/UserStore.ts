import { decorate, observable, action } from "mobx";
import { User } from "../../server/models/User";
import { Api } from "./Api";

export class UserStore extends Api<User> {
  user?: User;

  endpoint = "/api/v1/user/"

  isAdmin = () => {
    return this.user && this.user.role === "ADMIN";
  }

  isLoggedin = async () => {
    const user: User = await this.fetch("isLoggedin", "GET");
    this.user = user;
  }

  login = async (login: string, password: string) => {
    const token: string = await this.fetch("login", "POST", {
      login,
      password
    });

    sessionStorage.setItem('token', token);
  }

  logout = async () => {
    await this.fetch("logout", "GET");
    this.user = undefined;
    sessionStorage.setItem("token", "");
  }
}

decorate(UserStore, {
  user: observable,
  login: action,
  logout: action
});

export const userStore = new UserStore;