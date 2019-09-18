import { ObjectID, FilterQuery, QuerySelector } from "mongodb";
import { mongo } from "../../common/db";
import { DirectionEvent } from "../../models/DirectionEvent";
import _ from "lodash";
import moment from "moment";

export const COLLECTION = "direction-event";

class DirectionEventService {
  editDirectionEvent = async (event: DirectionEvent) => {
    const collection = mongo.db.collection(COLLECTION);
    const $set = _.omit(event, "_id");

    $set._iddirection = new ObjectID(event._iddirection);
    $set.dt = moment(event.dt).toDate();

    if (event._id) {
      const _id = new ObjectID(event._id);
      await collection.update({ _id }, { $set });
      return _id;
    }

    const data = await collection.insert($set);
    return data.ops[0]._id;
  }

  getDirectionEvents = async (query: FilterQuery<DirectionEvent>) => {
    if (query._id) {
      query._id = new ObjectID(query._id as string);
    }

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

    const collection = mongo.db.collection(COLLECTION);
    const [
      list,
      count
    ] = await Promise.all([
      collection.find<DirectionEvent>(query).sort({ dt: 1 }).toArray(),
      collection.count(query)
    ]);
    return {
      list,
      count
    }
  }

  rmDirectionEvent = async (_id: string | ObjectID) => {
    if (!_id) return;
    _id = new ObjectID(_id);
    const collection = await mongo.db.collection(COLLECTION);
    await collection.remove({ _id });
  }
}

export const directionEventService = new DirectionEventService();