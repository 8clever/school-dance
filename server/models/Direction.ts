import { ObjectID } from "bson";

export type DirectionSection = "projects" | "directions" | "master-classes"

export interface Direction {
  _id?: string | ObjectID;
  name: string;
  images: Array<string | ObjectID>;
  desc: string;
  section?: DirectionSection
}