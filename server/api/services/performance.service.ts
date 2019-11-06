import { ObjectID } from "mongodb";
import { Performance } from "../../models/Performance";
import _ from "lodash";
import { MongoService } from "./mongo.service";

class PerformanceService extends MongoService<Performance> {

  collection = "performance";

  editPerformance = async (event: Performance) => {
    event.images = event.images.map(i => new ObjectID(i));
    return this._edit(event);
  }

  getPerformance = this._find;
  rmPerformance = this._remove
}

export const performanceService = new PerformanceService();