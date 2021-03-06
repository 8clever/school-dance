import { ObjectID } from "bson";

export interface Config {
  _id?: string | ObjectID;
  calendarTimeRange: {
    from: number;
    to: number;
  }
  homePageTitle: string;
  homeCarousel: Array<string | ObjectID>
}