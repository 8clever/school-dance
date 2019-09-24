import { ObjectID } from "mongodb";
import { Leader } from "../../models/Leaders";
import _ from "lodash";
import { MongoService } from "./mongo.service";

class LeaderService extends MongoService<Leader> {

  collection = "leader";

  editLeader = async (teacher: Leader) => {
    teacher.images = teacher.images.map(i => new ObjectID(i));
    return this._edit(teacher);
  }

  getLeader = this._find;
  rmLeader = this._remove;
}

export const leaderService = new LeaderService();