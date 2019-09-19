import { ObjectID, RootQuerySelector } from "mongodb";
import { Event } from "../../models/Event";
import { MongoService } from "./mongo.service";
import _ from "lodash";
import moment from "moment";

class EventService extends MongoService<Event> {

  collection = "event";

  editEvent = async (event: Event) => {
    event._idperformance = new ObjectID(event._idperformance as string);
    event.dt = moment(event.dt).toDate();
    return this._edit(event);
  }

  getEvents = async (query: RootQuerySelector<Event> | Event) => {

    if (query.dt) {
      if (query.dt.$gte) query.dt.$gte = moment(query.dt.$gte).toDate();
      if (query.dt.$lte) query.dt.$lte = moment(query.dt.$lte).toDate();
    }

    if (query._idperformance) {
      query._idperformance = new ObjectID(query._idperformance);
    }

    return this._find(query);
  };
  rmEvent = this._remove;
}

export const eventService = new EventService();