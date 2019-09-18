import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, FormText } from "reactstrap";
import { observer } from "mobx-react-lite";
import { directionEventStore } from "../store/DirectionEventStore";
import DatePicker from "react-datepicker";
import moment from "moment";

interface DirectionEventEditProps {
  _id?: string;
  _iddirection: string;
  visible: boolean;
  toggle: () => void;
}

export const DirectionEventEdit = observer((props: DirectionEventEditProps) => {

  React.useEffect(() => {
    directionEventStore.createDirectionEvent(props._iddirection);
  }, [props.visible]);

  if (!directionEventStore.directionEvent) return null;

  return (
    <Modal toggle={props.toggle} isOpen={props.visible}>
      <ModalHeader>
        {
          directionEventStore.directionEvent._id ? 
          "Редактирование события" : 
          "Создание события"
        }
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Наименование</Label>
          <Input 
            placeholder={"Текст..."}
            value={directionEventStore.directionEvent.name}
            onChange={e => {
              directionEventStore.directionEvent.name = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Описание</Label>
          <Input 
            type="textarea" 
            value={directionEventStore.directionEvent.description}
            onChange={e => {
              directionEventStore.directionEvent.description = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Дата события</Label>
          <br/>
          <DatePicker
            className={"form-control"}
            selected={moment(directionEventStore.directionEvent.dt).toDate()}
            onChange={date => directionEventStore.directionEvent.dt = date}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="dd.MM.yyyy HH:mm"
          />
        </FormGroup>

      </ModalBody>
      <ModalFooter>
        <Button color={"secondary"} onClick={props.toggle}>
          Отмена
        </Button>
        <Button color={"primary"} onClick={async () => {
          await directionEventStore.saveDirectionEvent();
          await directionEventStore.loadDirectionEvents({ 
            _iddirection: props._iddirection,
            dt: { $gte: new Date() 
          }});
          props.toggle();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})