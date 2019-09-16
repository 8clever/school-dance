import { User } from "../../models/User";
import { mongo } from "../../common/db";
import { generateHash } from "./hepers";
import { ObjectID } from "bson";
import { sessionService } from "./session.service";
import { FilterQuery, FindOneOptions } from "mongodb";
import _ from "lodash";

export const COLLECTION = "users";

export class UserService {

  editUser = async (user: User) => {
    const collection = await mongo.db.collection(COLLECTION);

    if (user.password) {
      user.password = generateHash(user.password);
    }

    if (user._id) {
      const _id = new ObjectID(user._id);
      const $set = _.omit(user, "_id");
      await collection.updateOne({ _id }, { $set });
      return _id;
    }

    const data = await collection.insertOne(user);
    return data.ops[0]._id;
  }

  getUsers = async (query: FilterQuery<User>, options?: FindOneOptions) => {
    const collection = await mongo.db.collection(COLLECTION);
    const [ list, count ] = await Promise.all([
      collection.find<User>(query, options).toArray(),
      collection.count(query)
    ]);
    return {
      list,
      count
    }
  }

  isLoggedin = async (token: string) => {
    const session = await sessionService.getSession(token);
    if (!session) return null;
    const users = await this.getUsers({ _id: session._iduser });
    return users.list[0] || null;
  }

  login = async (login: string, password: string) => {
    const collection = await mongo.db.collection(COLLECTION);
    const user = await collection.findOne<User>({
      login,
      password: generateHash(password)
    });

    if (!user) throw new Error("Login or password are incorrect");

    const token = await sessionService.addSession(user._id);
    return token;
  }
}

export const userService = new UserService();