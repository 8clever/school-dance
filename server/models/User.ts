import { ObjectID } from "bson";

export interface User {
  _id?: string | ObjectID;
  password?: string;
  login: string;
  role: "ADMIN"
}