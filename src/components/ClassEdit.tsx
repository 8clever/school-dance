import React from "react";
import { observer } from "mobx-react-lite";
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Input, ModalFooter, Button, Row, Col } from "reactstrap";
import { ImagePreview } from "./ImagePreview";
import { ClassStore } from "../store/ClassStore";

interface ClassEditProps {
  visible: boolean;
  _id?: string;
  toggle: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const classStore = new ClassStore();
export const ClassEdit = observer((props: ClassEditProps) => {

  React.useEffect(() => {
    if (!props.visible) return;

    classStore.create();

    if (props._id) {
      classStore.loadItem(props._id);
    }

  }, [props._id, props.visible]);

  if (!classStore.item) return null;

  return (
    <Modal toggle={props.toggle} isOpen={props.visible}>
      <ModalHeader>
        {
          classStore.item._id ? 
          "Редактирование класса" : 
          "Создание класса"
        }
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Наименование</Label>
          <Input 
            placeholder={"Текст..."}
            value={classStore.item.name}
            onChange={e => {
              classStore.item.name = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Описание</Label>
          <Input 
            rows={4}
            type="textarea" 
            value={classStore.item.description}
            onChange={e => {
              classStore.item.description = e.target.value;
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
                if (file) classStore.newImages.push(file);
              });
            }
          }/>
        </FormGroup>

        <Row>
          {
            classStore.item.images.map((i, idx) => {
              return (
                <Col md={6} key={idx}>
                  <ImagePreview 
                    _id={i as string}
                    onRemove={() => {
                      classStore.item.images.splice(idx, 1);
                    }}
                  />
                </Col>
              )
            })
          }
        </Row>

      </ModalBody>
      <ModalFooter>
        <Button color={"secondary"} onClick={() => {
          props.toggle();
          props.onCancel();
        }}>
          Отмена
        </Button>
        <Button color={"primary"} onClick={async () => {
          await classStore.save();
          props.toggle();
          props.onSave();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})