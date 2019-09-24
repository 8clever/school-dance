import { ObjectID } from "bson";

export interface Price {
  _id?: ObjectID | string;
  _idsubscribe: ObjectID | string;
  description: string;
  price: number;
}