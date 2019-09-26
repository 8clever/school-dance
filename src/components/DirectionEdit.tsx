import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, FormText, Row, Col, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
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
          <Label>Описание</Label>
          <Input 
            type="textarea"
            rows={4}
            placeholder={"Текст..."}
            value={directionStore.direction.desc}
            onChange={e => {
              directionStore.direction.desc = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>
            <a 
              target="_blank" 
              href="https://crontab.guru/#00_12-14_*_*_1,3,5">
              Расписание*
            </a>
          </Label>
          <div>
            {
              directionStore.direction.schedule.map((s, idx) => {
                return (
                  <InputGroup 
                    key={idx}
                    className="mb-2">
                    <Input 
                      value={s}
                      onChange={e => {
                        directionStore.direction.schedule[idx] = e.target.value;
                      }}
                    />
                    <InputGroupAddon
                      addonType={"append"}
                    >
                      <Button 
                        onClick={() => {
                          directionStore.direction.schedule.splice(idx, 1);
                        }}
                        size="sm">
                        <Icon 
                          className="text-danger"
                          type="trash" 
                        />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                )
              })
            }
          </div>
          <Button 
            onClick={() => {
              directionStore.direction.schedule.push("00 12-14 * * 1,3,5")
            }}
            color="primary"
            size="sm">
            <Icon type="plus" />
          </Button>
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
                key={idx}
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
          if (props._id) {
            await directionStoreGlobal.loadDirection(props._id);
          }
          props.toggle();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})