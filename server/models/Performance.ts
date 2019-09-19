import { ObjectID } from "bson";
import { Direction } from "./Direction";

export interface Performance {
  _id?: string | ObjectID;
  _iddirection: Direction["_id"];
  name: string;
  description: string;
  images: Array<string | ObjectID>
}