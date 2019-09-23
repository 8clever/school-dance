import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from "reactstrap";
import { observer } from "mobx-react-lite";
import { teacherStore as teacherGlobalStore, TeacherStore } from "../store/TeacherStore";
import { ImagePreview } from "./ImagePreview";

interface TeacherEditProps {
  _id?: string;
  visible: boolean;
  toggle: () => void;
}

const teacherStore = new TeacherStore();

export const TeacherEdit = observer((props: TeacherEditProps) => {

  React.useEffect(() => {
    teacherStore.createTeacher();
    if (!(props.visible && props._id)) return;

    teacherStore.loadTeacher(props._id);
  }, [props.visible, props._id])

  const teacher = teacherStore.teacher;
  if (!teacher) return null;

  return (
    <Modal toggle={props.toggle} isOpen={props.visible}>
      <ModalHeader>
        {
          teacher._id ? 
          "Редактирование педагога" : 
          "Создание педагога"
        }
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Ф.И.О</Label>
          <Input 
            placeholder={"Текст..."}
            value={teacher.fullName}
            onChange={e => {
              teacher.fullName = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Описание</Label>
          <Input 
            type="textarea" 
            value={teacher.description}
            onChange={e => {
              teacher.description = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Фотографии</Label>
          <Input 
            type="file" 
            accept={".jpg, .png, .jpeg"} 
            onChange={(e) => {
              Object.keys(e.target.files).forEach(key => {
                const file = e.target.files[key];
                if (file) teacherStore.newImages.push(file);
              });
            }
          }/>
        </FormGroup>

        {
          teacherStore.teacher.images.map((i, idx) => {
            return (
              <ImagePreview 
                key={idx}
                _id={i as string}
                onRemove={() => {
                  teacherStore.teacher.images.splice(idx, 1);
                }}
              />            
            )
          })
        }

      </ModalBody>
      <ModalFooter>
        <Button color={"secondary"} onClick={props.toggle}>
          Отмена
        </Button>
        <Button color={"primary"} onClick={async () => {
          await teacherStore.saveTeacher();
          await teacherGlobalStore.loadTeacherList({});
          props.toggle();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})