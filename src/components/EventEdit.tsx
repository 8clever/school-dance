import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label } from "reactstrap";
import { observer } from "mobx-react-lite";
import { eventStore } from "../store/EventStore";
import DatePicker from "react-datepicker";

interface EventEditProps {
  _id?: string;
  _idperformance: string;
  visible: boolean;
  toggle: () => void;
}

export const EventEdit = observer((props: EventEditProps) => {

  React.useEffect(() => {
    eventStore.createEvent(props._idperformance);
  }, [props.visible]);

  if (!eventStore.event) return null;

  return (
    <Modal toggle={props.toggle} isOpen={props.visible}>
      <ModalHeader>
        {
          eventStore.event._id ? 
          "Редактирование события" : 
          "Создание события"
        }
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Дата</Label>
          <br />
          <DatePicker 
            dateFormat="dd.MM.yyyy HH:mm"
            timeFormat="HH:mm"
            showTimeSelect
            selected={eventStore.event.dt as Date}
            onChange={date => {
              eventStore.event.dt = date;
            }}
            className="form-control" 
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color={"secondary"} onClick={props.toggle}>
          Отмена
        </Button>
        <Button color={"primary"} onClick={async () => {
          await eventStore.saveEvent();
          props.toggle();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})