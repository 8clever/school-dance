import { ObjectID } from "bson";

export interface Event {
  _id?: string | ObjectID;
  _idperformance: string | ObjectID;
  dt: Date | string;
}