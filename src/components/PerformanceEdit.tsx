import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from "reactstrap";
import { observer } from "mobx-react-lite";
import { PerformanceStore } from "../store/PerformanceStore";
import { ImagePreview } from "./ImagePreview";

interface PerformanceEditProps {
  _id?: string;
  visible: boolean;
  toggle: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const performanceStore = new PerformanceStore()
export const PerformanceEdit = observer((props: PerformanceEditProps) => {

  React.useEffect(() => {
    performanceStore.create();
    if (!(props._id && props.visible)) return;

    performanceStore.loadItem(props._id);
  }, [props.visible, props._id]);

  if (!performanceStore.item) return null;

  return (
    <Modal toggle={props.toggle} isOpen={props.visible}>
      <ModalHeader>
        {
          performanceStore.item._id ? 
          "Редактирование спектакля" : 
          "Создание спектакля"
        }
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Наименование</Label>
          <Input 
            placeholder={"Текст..."}
            value={performanceStore.item.name}
            onChange={e => {
              performanceStore.item.name = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Описание</Label>
          <Input 
            type="textarea" 
            value={performanceStore.item.description}
            onChange={e => {
              performanceStore.item.description = e.target.value;
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
                if (file) performanceStore.newImages.push(file);
              });
            }
          }/>
        </FormGroup>

        {
          performanceStore.item.images.map((i, idx) => {
            return (
              <ImagePreview 
                _id={i as string}
                onRemove={() => {
                  performanceStore.item.images.splice(idx, 1);
                }}
              />            
            )
          })
        }

      </ModalBody>
      <ModalFooter>
        <Button color={"secondary"} onClick={() => {
          props.toggle();
          props.onCancel();
        }}>
          Отмена
        </Button>
        <Button color={"primary"} onClick={async () => {
          await performanceStore.save();
          props.toggle();
          props.onSave();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})