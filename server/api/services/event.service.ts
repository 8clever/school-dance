import { ObjectID } from "mongodb";
import { Event } from "../../models/Event";
import { MongoService } from "./mongo.service";
import _ from "lodash";

class EventService extends MongoService<Event> {

  collection = "event";

  editEvent = async (event: Event) => {
    event._idperformance = new ObjectID(event._idperformance as string);
    return this._edit(event);
  }

  getEvents = this._find;
  rmEvent = this._remove;
}

export const eventService = new EventService();