import { ObjectID } from "bson";

export interface Subscribe {
  _id?: string | ObjectID,
  name: string;
  images: Array<string | ObjectID>;
  paymentLink: string;
}