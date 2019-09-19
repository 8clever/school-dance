import { toJS, decorate, observable, action } from "mobx";
import { Api } from "./Api";
import { Teacher } from "../../server/models/Teacher";
import { RootQuerySelector } from "mongodb";
import { imageStore } from "./ImageStore";

class TeacherStore extends Api<Teacher> {

  teacher?: Teacher;
  teacherList: Teacher[] = [];
  newImages: Blob[] = [];

  endpoint = "/api/v1/teacher/";

  createTeacher = async () => {
    this.teacher = {
      fullName: "",
      description: "",
      images: []
    }
    this.newImages = [];
  }

  loadTeacher = async (_id: string) => {
    const data = await this.getItems({ _id });
    this.teacher = data.list[0];
  }

  loadTeacherList = async (query: RootQuerySelector<Performance>) => {
    const data = await this.getItems(query);
    this.teacherList = data.list;
  }

  saveTeacher = async () => {
    const teacher = toJS(this.teacher);
    if (!teacher) return;

    for(const image of this.newImages) {
      const _idimage = await imageStore.upload(image);
      teacher.images.push(_idimage);
    }

    this.newImages = [];
    return this.editItem(teacher);;
  }

  rmTeacher = async (_id: string) => {
    return this.removeItem({ _id });
  }
}

decorate(TeacherStore, {
  teacher: observable,
  teacherList: observable,
  createTeacher: action,
  loadTeacher: action,
  loadTeacherList: action
});

export const teacherStore = new TeacherStore();
