import { ObjectID } from "bson";

export interface Class {
  _id?: string | ObjectID;
  name: string;
  description: string;
  images: Array<string | ObjectID>
}