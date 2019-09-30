import { ObjectID } from "bson";

export interface Direction {
  _id?: string | ObjectID;
  name: string;
  shortName: string;
  images: Array<string | ObjectID>;
  schedule: string[];
  desc: string;
}