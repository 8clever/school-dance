import React from "react";
import { observer } from "mobx-react-lite";
import { ConfigStore } from "../store/ConfigStore";
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Input, ModalFooter, Button, Row, Col } from "reactstrap";
import { ImagePreview } from "./ImagePreview";

interface HomePageEditProps {
  visible: boolean;
  toggle: () => void;
  onSave: () => void;
  onCancel?: () => void;
}

const configStore = new ConfigStore();
export const HomePageEdit = observer((props: HomePageEditProps) => {

  React.useEffect(() => {
    if (!props.visible) return;

    configStore.getConfig();
  }, [props.visible]);

  if (!configStore.item) return null;

  return (
    <Modal toggle={props.toggle} isOpen={props.visible}>
      <ModalHeader>
        Редактирование домашней страницы
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Текст бегущей строки</Label>
          <Input 
            placeholder={"Текст..."}
            value={configStore.item.homePageTitle}
            onChange={e => {
              configStore.item.homePageTitle = e.target.value;
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
                if (file) configStore.newImages.push(file);
              });
            }
          }/>
        </FormGroup>

        <Row>
          {
            configStore.item.homeCarousel.map((i, idx) => {
              return (
                <Col md={6} key={idx}>
                  <ImagePreview 
                    _id={i as string}
                    onRemove={() => {
                      configStore.item.homeCarousel.splice(idx, 1);
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
          
          if (!props.onCancel) return;
          props.onCancel();
        }}>
          Отмена
        </Button>
        <Button color={"primary"} onClick={async () => {
          await configStore.save();
          props.toggle();
          props.onSave();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})