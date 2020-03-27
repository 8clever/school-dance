import { ObjectID } from "bson";

export type DirectionSection = 
"projects" | 
"directions" | 
"master-classes" |
"menu" |
"studio"

export const directionSectionMap = {
  projects: "Проекты",
  directions: "Направления",
  "master-classes": "Мастер-классы",
  "menu": "Меню",
  "studio": "Студия"
}

export interface SubmenuItem {
  name: string;
  url: string;
  description: string;
  images: Array<string | ObjectID>;
}

export interface Direction {
  _id?: string | ObjectID;
  name: string;
  url: string;
  images: Array<string | ObjectID>;
  desc: string;
  submenu: SubmenuItem[];
  section?: DirectionSection;
}