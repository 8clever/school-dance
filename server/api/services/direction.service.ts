import { ObjectID, FilterQuery } from "mongodb";
import { mongo } from "../../common/db";
import { Direction } from "../../models/Direction";
import _ from "lodash";

export const COLLECTION = "direction";

class DirectionService {
  editDirection = async (direction: Direction) => {
    const collection = mongo.db.collection(COLLECTION);
    const $set = _.omit(direction, "_id");
    $set.images = direction.images.map(img => new ObjectID(img));

    if (direction._id) {
      const _id = new ObjectID(direction._id);
      await collection.update({ _id }, { $set });
      return _id;
    }

    const data = await collection.insert($set);
    return data.ops[0]._id;
  }

  getDirections = async (query: FilterQuery<Direction>) => {
    if (query._id) {
      query._id = new ObjectID(query._id as string);
    }

    const collection = mongo.db.collection(COLLECTION);
    const [
      list,
      count
    ] = await Promise.all([
      collection.find<Direction>(query).toArray(),
      collection.count(query)
    ]);
    return {
      list,
      count
    }
  }

  rmDirection = async (_id: string | ObjectID) => {
    if (!_id) return;
    _id = new ObjectID(_id);
    const collection = await mongo.db.collection(COLLECTION);
    await collection.remove({ _id });
  }
}

export const directionService = new DirectionService();