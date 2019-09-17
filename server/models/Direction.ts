import { ObjectID } from "bson";

export interface Direction {
  _id?: string | ObjectID;
  name: string;
  images: Array<string | ObjectID>;
}