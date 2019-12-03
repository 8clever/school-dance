import { ObjectID, RootQuerySelector } from "mongodb";
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

  _find = async (query: RootQuerySelector<T>, sort?: object, limit?: number) => {
    if (
      query._id && 
      query._id.$in &&
      Array.isArray(query._id.$in)
    ) {
      query._id.$in = query._id.$in.map(_id => new ObjectID(_id))
    } else if (_.isString(query._id)) {
      query._id = new ObjectID(query._id);
    } else {
      delete query._id;
    }

    const collection = mongo.db.collection(this.collection);
    const cursor = collection.find<T>(query);

    if (sort) {
      cursor.sort(sort);
    }

    if (limit) {
      cursor.limit(Number(limit));
    }
    
    const [
      list,
      count
    ] = await Promise.all([
      cursor.toArray(),
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