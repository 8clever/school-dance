import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, FormText } from "reactstrap";
import { observer } from "mobx-react-lite";
import { directionStore } from "../store/DirectionStore";

interface DirectionEditProps {
  _id?: string;
  visible: boolean;
  toggle: () => void;
}

export const DirectionEdit = observer((props: DirectionEditProps) => {

  React.useEffect(() => {
    directionStore.loadDirection(props._id);
  }, [props._id])

  if (!directionStore.direction) return null;

  return (
    <Modal toggle={props.toggle} isOpen={props.visible}>
      <ModalHeader>
        {
          directionStore.direction._id ? 
          "Редактирование направления" : 
          "Создание направления"
        }
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Наименование</Label>
          <Input 
            placeholder={"Текст..."}
            value={directionStore.direction.name}
            onChange={e => {
              directionStore.direction.name = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Фотографии</Label>
          <Input 
            type="file" 
            accept={".jpg, .png, .jpeg"} 
            multiple
            onChange={(e) => {
              Object.keys(e.target.files).forEach(key => {
                const file = e.target.files[key];
                if (file) directionStore.newImages.push(file);
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
          await directionStore.saveDirection();
          await directionStore.loadDirections({});
          props.toggle();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})