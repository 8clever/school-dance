import { toJS, decorate, observable, action } from "mobx";
import { Api } from "./Api";
import { Teacher } from "../../server/models/Teacher";
import { imageStore } from "./ImageStore";

export class TeacherStore extends Api<Teacher> {

  newImages: Blob[] = [];

  endpoint = "/api/v1/teacher/";

  create = async () => {
    this.item = {
      url: "",
      fullName: "",
      description: "",
      images: []
    }
    this.newImages = [];
  }

  save = async () => {
    const teacher = toJS(this.item);
    if (!teacher) return;

    for(const image of this.newImages) {
      const _idimage = await imageStore.upload(image);
      teacher.images.push(_idimage);
    }

    this.newImages = [];
    return this.editItem(teacher);;
  }
}

decorate(TeacherStore, {
  newImages: observable,
  create: action,
  save: action
});

export const teacherStore = new TeacherStore();
