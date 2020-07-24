import { ObjectID } from "bson";

export type DirectionSection = 
"projects" | 
"menu" |
"studio" |
"home"

export const directionSectionMap = {
  projects: "Проекты",
  "menu": "Меню",
  "studio": "Студия",
  "home": "Главная"
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