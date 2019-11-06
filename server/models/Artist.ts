import { ObjectID } from "bson";

export interface Artist {
  _id?: string | ObjectID;
  name: string;
  description: string;
  images: Array<string | ObjectID>
}