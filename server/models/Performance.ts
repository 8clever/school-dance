import { ObjectID } from "bson";

export interface Performance {
  _id?: string | ObjectID;
  name: string;
  description: string;
  images: Array<string | ObjectID>
}