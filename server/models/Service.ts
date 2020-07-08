import { ObjectID } from "mongodb";

export interface Service {
  _id?: string | ObjectID
  id: string;
  name: string;
  description: string;
  amount: string;
  specialOffer: boolean;
}