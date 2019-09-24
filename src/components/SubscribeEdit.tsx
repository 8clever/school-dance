import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from "reactstrap";
import { observer } from "mobx-react-lite";
import { subscribeStore as globalStore, SubscribeStore } from "../store/SubscribeStore";
import { ImagePreview } from "./ImagePreview";

interface SubscribeEditProps {
  _id?: string;
  visible: boolean;
  toggle: () => void;
}

const localStore = new SubscribeStore();

export const SubscribeEdit = observer((props: SubscribeEditProps) => {

  React.useEffect(() => {
    localStore.create();
    if (!(props.visible && props._id)) return;

    localStore.loadItem(props._id);
  }, [ props.visible, props._id ]);

  if (!localStore.item) return null;

  return (
    <Modal toggle={props.toggle} isOpen={props.visible}>
      <ModalHeader>
        {
          localStore.item._id ? 
          "Редактирование абонемента" : 
          "Создание абонемента"
        }
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Наименование</Label>
          <Input 
            placeholder={"Текст..."}
            value={localStore.item.name}
            onChange={e => {
              localStore.item.name = e.target.value;
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
                if (file) localStore.newImages.push(file);
              });
            }
          }/>
        </FormGroup>

        {
          localStore.item.images.map((i, idx) => {
            return (
              <ImagePreview 
                _id={i as string}
                onRemove={() => {
                  localStore.item.images.splice(idx, 1);
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
          await localStore.save();
          await globalStore.loadItems({});
          props.toggle();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})