import { ObjectID } from "bson";

export interface Leader {
  _id?: string | ObjectID;
  fullName: string;
  description: string;
  images: Array<string | ObjectID>;
  url: string;
}