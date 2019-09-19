import { ObjectID, RootQuerySelector } from "mongodb";
import { Performance } from "../../models/Performance";
import _ from "lodash";
import { MongoService } from "./mongo.service";

class EventService extends MongoService<Performance> {

  collection = "performance";

  editPerformance = async (event: Performance) => {
    event._iddirection = new ObjectID(event._iddirection);
    event.images = event.images.map(i => new ObjectID(i));
    return this._edit(event);
  }

  getPerformance = async (query: RootQuerySelector<Performance>) => {
    if (query._iddirection) {
      query._iddirection = new ObjectID(query._iddirection as string);
    }

    return this._find(query);
  }

  rmPerformance = this._remove
}

export const eventService = new EventService();