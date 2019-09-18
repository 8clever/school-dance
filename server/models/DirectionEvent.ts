import { ObjectID } from "bson";
import { Direction } from "./Direction";

export interface DirectionEvent {
  _id?: string | ObjectID;
  _iddirection: Direction["_id"];
  name: string;
  description: string;
  dt: string | Date;
}