import { ObjectID } from "bson";

export interface PieceOfNews {
  _id?: string | ObjectID;
  _dt: string | Date;
  name: string;
  description: string;
  images: Array<string | ObjectID>
}