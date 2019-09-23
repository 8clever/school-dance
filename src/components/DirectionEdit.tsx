import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, FormText, Row, Col } from "reactstrap";
import { observer } from "mobx-react-lite";
import { directionStore as directionStoreGlobal, DirectionStore } from "../store/DirectionStore";
import { imageStore } from "../store/ImageStore";
import { Icon } from "./Icon";
import { ImagePreview } from "./ImagePreview";

interface DirectionEditProps {
  _id?: string;
  visible: boolean;
  toggle: () => void;
}

const directionStore = new DirectionStore();

export const DirectionEdit = observer((props: DirectionEditProps) => {

  React.useEffect(() => {
    directionStore.createDirection();
    if (!(props.visible && props._id)) return;

    directionStore.loadDirection(props._id);
  }, [ props.visible, props._id ]);

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

        {
          directionStore.direction.images.map((i, idx) => {
            return (
              <ImagePreview 
                _id={i as string}
                onRemove={() => {
                  directionStore.direction.images.splice(idx, 1);
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
          await directionStore.saveDirection();
          await directionStoreGlobal.loadDirections({});
          props.toggle();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})