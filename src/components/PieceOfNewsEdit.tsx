import React from "react";
import { observer } from "mobx-react-lite";
import { PieceOfNewsStore } from "../store/PieceOfNewsStore";
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Row, Col, ModalFooter, Button } from "reactstrap";
import { ImagePreview } from "./ImagePreview";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import { I18nInput } from "./Localization";

interface PieceOfNewsEditProps {
  visible: boolean;
  _id?: string;
  toggle: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const PieceOfNewsEdit = observer((props: PieceOfNewsEditProps) => {

  const [ store ] = React.useState(new PieceOfNewsStore());
    
  React.useEffect(() => {
    if (!props.visible) return;

    store.create();

    if (props._id) {
      store.loadItem(props._id);
    }

  }, [props._id, props.visible]);

  if (!store.item) return null;

  return (
    <Modal toggle={props.toggle} isOpen={props.visible}>
      <ModalHeader>
        {
          store.item._id ? 
          "Редактирование новости" : 
          "Создание новости"
        }
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Наименование</Label>
          <I18nInput 
            placeholder={"Текст..."}
            value={store.item.name}
            onChange={e => {
              store.item.name = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Описание</Label>
          <I18nInput 
            rows={4}
            type="textarea" 
            value={store.item.description}
            onChange={e => {
              store.item.description = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Дата</Label>
          <br/>
          <ReactDatePicker
            className="form-control" 
            dateFormat="dd.MM.yyyy"
            selected={moment(store.item._dt).toDate()}
            onChange={date => {
              store.item._dt = date
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
                if (file) store.newImages.push(file);
              });
            }
          }/>
        </FormGroup>

        <Row>
          {
            store.item.images.map((i, idx) => {
              return (
                <Col md={6} key={idx}>
                  <ImagePreview 
                    _id={i as string}
                    onRemove={() => {
                      store.item.images.splice(idx, 1);
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
          await store.save();
          props.toggle();
          props.onSave();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})