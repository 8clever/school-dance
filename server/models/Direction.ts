import { ObjectID } from "bson";

export interface Direaction {
  name: string;
  images: Array<string | ObjectID>;
}