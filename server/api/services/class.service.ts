import { ObjectID } from "mongodb";
import { Class } from "../../models/Class";
import _ from "lodash";
import { MongoService } from "./mongo.service";

class ClassService extends MongoService<Class> {

  collection = "class";

  edit = async (data: Class) => {
    data.images = data.images.map(i => new ObjectID(i));
    return this._edit(data);
  }

  get = this._find;
  rm = this._remove
}

export const classService = new ClassService();