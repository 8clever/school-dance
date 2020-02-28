import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { observer } from "mobx-react-lite";
import { directionStore as directionStoreGlobal, DirectionStore } from "../store/DirectionStore";
import { ImagePreview } from "./ImagePreview";
import { DirectionSection } from "../../server/models/Direction";
import _ from "lodash";
import { directionSectionMap } from "../pages/Direction";


interface DirectionEditProps {
  _id?: string;
  visible: boolean;
  toggle: () => void;
}

const sectionOptions: { value?: DirectionSection, label: string }[] = [
  {
    label: "Не выбрано"
  },
  {
    value: "projects",
    label: "Проекты"
  }
]

const directionStore = new DirectionStore();
export const DirectionEdit = observer((props: DirectionEditProps) => {

  directionStore.defaults();

  React.useEffect(() => {
    directionStore.create();
    if (!(props.visible && props._id)) return;

    directionStore.loadItem(props._id);
  }, [ props.visible, props._id ]);

  return (
    <Modal 
      size="xl"
      toggle={props.toggle} 
      isOpen={props.visible}>
      <ModalHeader>
        {
          directionStore.item._id ? 
          "Редактирование направления" : 
          "Создание направления"
        }
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Наименование</Label>
              <Input 
                placeholder={"Текст..."}
                value={directionStore.item.name}
                onChange={e => {
                  directionStore.item.name = e.target.value;
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label>Описание</Label>
              <Input 
                type="textarea"
                rows={4}
                placeholder={"Текст..."}
                value={directionStore.item.desc}
                onChange={e => {
                  directionStore.item.desc = e.target.value;
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

            <Row>
              {
                directionStore.item.images.map((i, idx) => {
                  return (
                    <Col md={6} key={idx}>
                      <ImagePreview 
                        _id={i as string}
                        onRemove={() => {
                          directionStore.item.images.splice(idx, 1);
                        }}
                      />  
                    </Col>
                  )
                })
              }
            </Row>
          </Col>
          <Col md={6}>

            <FormGroup>
              <Label>Привязка к разделу</Label>
              <Input 
                type="select"
                options={sectionOptions}
                value={directionStore.item.section}
                onChange={e => {
                  directionStore.item.section = e.target.value as DirectionSection;
                }}
                placeholder="Выбор...">
                <option value="">Не выбрано</option>
                {_.map(directionSectionMap, (v, k) => {
                  return <option key={k} value={k}>{v}</option>
                })}
              </Input>
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color={"secondary"} onClick={props.toggle}>
          Отмена
        </Button>
        <Button color={"primary"} onClick={async () => {
          await directionStore.save();
          await directionStoreGlobal.loadItems({});
          if (props._id) {
            await directionStoreGlobal.loadItem(props._id);
          }
          props.toggle();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})