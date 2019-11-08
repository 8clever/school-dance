import React from "react";
import { observer } from "mobx-react-lite";
import { ArtistStore } from "../store/ArtistStore";
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Input, ModalFooter, Button, Row, Col } from "reactstrap";
import { ImagePreview } from "./ImagePreview";

interface ArtistEditProps {
  visible: boolean;
  _id?: string;
  toggle: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const artistStore = new ArtistStore();
export const ArtistEdit = observer((props: ArtistEditProps) => {

  React.useEffect(() => {
    if (!props.visible) return;

    artistStore.create();

    if (props._id) {
      artistStore.loadItem(props._id);
    }

  }, [props._id, props.visible]);

  if (!artistStore.item) return null;

  return (
    <Modal toggle={props.toggle} isOpen={props.visible}>
      <ModalHeader>
        {
          artistStore.item._id ? 
          "Редактирование aртиста" : 
          "Создание артиста"
        }
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Полное имя</Label>
          <Input 
            placeholder={"Текст..."}
            value={artistStore.item.name}
            onChange={e => {
              artistStore.item.name = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Описание</Label>
          <Input 
            rows={4}
            type="textarea" 
            value={artistStore.item.description}
            onChange={e => {
              artistStore.item.description = e.target.value;
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
                if (file) artistStore.newImages.push(file);
              });
            }
          }/>
        </FormGroup>

        <Row>
          {
            artistStore.item.images.map((i, idx) => {
              return (
                <Col md={6} key={idx}>
                  <ImagePreview 
                    _id={i as string}
                    onRemove={() => {
                      artistStore.item.images.splice(idx, 1);
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
          await artistStore.save();
          props.toggle();
          props.onSave();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})