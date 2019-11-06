import { ObjectID } from "bson";

export type SubmenuType = "teachers" | "artists" | "performance";

export interface Direction {
  _id?: string | ObjectID;
  name: string;
  shortName: string;
  images: Array<string | ObjectID>;
  schedule: string[];
  desc: string;
  submenu: {
    type: SubmenuType,
    items: Array<string | ObjectID>
  }
}