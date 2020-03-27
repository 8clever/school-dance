import { ObjectID } from "bson";

export interface Teacher {
  _id?: string | ObjectID;
  fullName: string;
  description: string;
  images: Array<string | ObjectID>;
  url: string;
}