import { ObjectID } from "mongodb";

export interface Order {
  _id?: string | ObjectID
  number: string;
  name: string;
  description: string;
  amount: string;
}