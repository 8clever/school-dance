import { decorate, observable, action } from "mobx";
import { User } from "../../server/models/User";

export class UserStore {
  user?: User;

  login = async (login, password) => {
    
  }
}

decorate(UserStore, {
  user: observable,
  login: action
});

export const userStore = new UserStore;