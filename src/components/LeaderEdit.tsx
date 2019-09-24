import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from "reactstrap";
import { observer } from "mobx-react-lite";
import { leaderStore as leaderGlobalStore, LeaderStore } from "../store/LeaderStore";
import { ImagePreview } from "./ImagePreview";

interface TeacherEditProps {
  _id?: string;
  visible: boolean;
  toggle: () => void;
}

const leaderStore = new LeaderStore();

export const LeaderEdit = observer((props: TeacherEditProps) => {

  React.useEffect(() => {
    leaderStore.createLeader();
    if (!(props.visible && props._id)) return;

    leaderStore.loadLeader(props._id);
  }, [props.visible, props._id])

  const element = leaderStore.leader;
  if (!element) return null;

  return (
    <Modal toggle={props.toggle} isOpen={props.visible}>
      <ModalHeader>
        {
          element._id ? 
          "Редактирование руководителя" : 
          "Создание руководителя"
        }
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Ф.И.О</Label>
          <Input 
            placeholder={"Текст..."}
            value={element.fullName}
            onChange={e => {
              element.fullName = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Описание</Label>
          <Input 
            type="textarea" 
            value={element.description}
            onChange={e => {
              element.description = e.target.value;
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
                if (file) leaderStore.newImages.push(file);
              });
            }
          }/>
        </FormGroup>

        {
          leaderStore.leader.images.map((i, idx) => {
            return (
              <ImagePreview 
                key={idx}
                _id={i as string}
                onRemove={() => {
                  leaderStore.leader.images.splice(idx, 1);
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
          await leaderStore.saveLeader();

          if (props._id) {
            await leaderGlobalStore.loadLeader(props._id);
          }

          await leaderGlobalStore.loadLeaderList({});
          props.toggle();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})