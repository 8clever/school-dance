import { ObjectID } from "mongodb";
import { Teacher } from "../../models/Teacher";
import _ from "lodash";
import { MongoService } from "./mongo.service";

class TeacherService extends MongoService<Teacher> {

  collection = "teacher";

  editTeacher = async (teacher: Teacher) => {
    teacher.images = teacher.images.map(i => new ObjectID(i));
    return this._edit(teacher);
  }

  getTeacher = this._find;
  rmTeacher = this._remove;
}

export const teacherService = new TeacherService();