import { User } from "../../models/User";
import { generateHash } from "./helpers";
import { sessionService } from "./session.service";
import { MongoService } from "./mongo.service";

export class UserService extends MongoService<User> {

  collection = "users";

  editUser = async (user: User) => {
    if (user.password) {
      user.password = generateHash(user.password);
    }

    return this._edit(user);
  }

  isLoggedin = async (token: string) => {
    const session = await sessionService.getSession(token);
    if (!session) return null;
    const users = await this.getUsers({ _id: session._iduser });
    return users.list[0] || null;
  }

  login = async (login: string, password: string) => {
    const data = await this._find({ 
      login,
      password: generateHash(password)
    });

    const user = data.list[0];
    if (!user) throw new Error("Login or password are incorrect");

    const token = await sessionService.addSession(user._id);
    return token;
  }

  getUsers = this._find;
}

export const userService = new UserService();