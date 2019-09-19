import { ObjectID, FilterQuery, QuerySelector, RootQuerySelector } from "mongodb";
import { mongo } from "../../common/db";
import _ from "lodash";

export const COLLECTION = "direction";

interface MongoLike {
  _id?: string | ObjectID
}

export class MongoService<T extends MongoLike> {

  collection = "";

  _edit = async (item: T) => {
    const collection = mongo.db.collection(this.collection);
    const $set = _.omit(item, "_id");

    if (item._id) {
      const _id = new ObjectID(item._id);
      await collection.update({ _id }, { $set });
      return _id;
    }

    const data = await collection.insert($set);
    return data.ops[0]._id;
  }

  _find = async (query: RootQuerySelector<T>) => {
    if (query._id) {
      query._id = new ObjectID(query._id);
    }

    const collection = mongo.db.collection(this.collection);
    const [
      list,
      count
    ] = await Promise.all([
      collection.find<T>(query).toArray(),
      collection.count(query)
    ]);

    return {
      list,
      count
    }
  }

  _remove = async (query: RootQuerySelector<T>) => {
    if (!query) return;
    if (query._id) {
      query._id = new ObjectID(query._id);
    }
    const collection = await mongo.db.collection(this.collection);
    await collection.remove(query);
  }
}

export const mongoService = new MongoService();