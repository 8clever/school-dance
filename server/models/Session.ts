import { User } from "./User";
import { ObjectID } from "bson";

export interface Session {
  _id?: string | ObjectID;
  _iduser: User["_id"],
  _dt: string | Date;
  token: string;
}