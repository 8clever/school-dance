import { Order } from "../../models/Order";
import _ from "lodash";
import { MongoService } from "./mongo.service";

class TeacherService extends MongoService<Order> {
  collection = "order";
  edit = this._edit;
  find = this._find;
  remove = this._remove;
}

export const teacherService = new TeacherService();