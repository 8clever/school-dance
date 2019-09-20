import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, FormText } from "reactstrap";
import { observer } from "mobx-react-lite";
import { performanceStore } from "../store/PerformanceStore";
import DatePicker from "react-datepicker";
import moment from "moment";

interface PerformanceEditProps {
  _id?: string;
  _iddirection: string;
  visible: boolean;
  toggle: () => void;
}

export const PerformanceEdit = observer((props: PerformanceEditProps) => {

  React.useEffect(() => {
    performanceStore.createPerformance(props._iddirection);
  }, [props.visible]);

  if (!performanceStore.performance) return null;

  return (
    <Modal toggle={props.toggle} isOpen={props.visible}>
      <ModalHeader>
        {
          performanceStore.performance._id ? 
          "Редактирование спектакля" : 
          "Создание спектакля"
        }
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Наименование</Label>
          <Input 
            placeholder={"Текст..."}
            value={performanceStore.performance.name}
            onChange={e => {
              performanceStore.performance.name = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Описание</Label>
          <Input 
            type="textarea" 
            value={performanceStore.performance.description}
            onChange={e => {
              performanceStore.performance.description = e.target.value;
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

      </ModalBody>
      <ModalFooter>
        <Button color={"secondary"} onClick={props.toggle}>
          Отмена
        </Button>
        <Button color={"primary"} onClick={async () => {
          await performanceStore.savePerformance();
          await performanceStore.loadPerformanceList({ 
            _iddirection: props._iddirection
          });
          props.toggle();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})