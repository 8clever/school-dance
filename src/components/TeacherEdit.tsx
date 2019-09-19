import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from "reactstrap";
import { observer } from "mobx-react-lite";
import { teacherStore } from "../store/TeacherStore";

interface TeacherEditProps {
  _id?: string;
  visible: boolean;
  toggle: () => void;
}

export const TeacherEdit = observer((props: TeacherEditProps) => {

  React.useEffect(() => {
    if (!props._id) return;
    teacherStore.loadTeacher(props._id);
  }, [props._id]);

  React.useEffect(() => {
    teacherStore.createTeacher();
  }, [props.visible])

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

      </ModalBody>
      <ModalFooter>
        <Button color={"secondary"} onClick={props.toggle}>
          Отмена
        </Button>
        <Button color={"primary"} onClick={async () => {
          await teacherStore.saveTeacher();
          await teacherStore.loadTeacherList({});
          props.toggle();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})