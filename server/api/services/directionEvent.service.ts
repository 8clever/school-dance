import { ObjectID, FilterQuery, QuerySelector, RootQuerySelector } from "mongodb";
import { DirectionEvent } from "../../models/DirectionEvent";
import _ from "lodash";
import moment from "moment";
import { MongoService } from "./mongo.service";

class DirectionEventService extends MongoService<DirectionEvent> {

  collection = "direction-event";

  editDirectionEvent = async (event: DirectionEvent) => {
    event._iddirection = new ObjectID(event._iddirection);
    event.dt = moment(event.dt).toDate();
    return this._edit(event);
  }

  getDirectionEvents = async (query: RootQuerySelector<DirectionEvent>) => {
    if (query._iddirection) {
      query._iddirection = new ObjectID(query._iddirection as string);
    }

    const dt = query.dt as QuerySelector<DirectionEvent["dt"]>;
    if (dt) {
      if (dt.$gte) {
        dt.$gte = moment(dt.$gte).toDate();
      }
      if (dt.$lte) {
        dt.$lte = moment(dt.$lte).toDate();;
      }
      query.dt = dt;
    }

    return this._find(query);
  }

  rmDirectionEvent = this._remove
}

export const directionEventService = new DirectionEventService();