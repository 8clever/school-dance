import React from "react";
import { observer } from "mobx-react-lite";
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Input, ModalFooter, Button } from "reactstrap";
import { ServiceStore } from "../store/ServiceStore";

interface ServiceViewProps {
  visible: boolean;
  _id?: string;
  toggle: () => void;
  onSave: () => void;
}

export const ServiceView = observer((props: ServiceViewProps) => {

  const serviceStore = React.useMemo(() => new ServiceStore(), [ props.visible ]);

  React.useEffect(() => {
    if (!props.visible) return;
    if (!props._id) return;
    serviceStore.loadItem(props._id);
  }, [ props.visible ]);

  return (
    <Modal toggle={props.toggle} isOpen={props.visible}>
      <ModalHeader>
        {
          props._id ? 
          "Редактирование cервиса" : 
          "Создание сервиса"
        }
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>ID</Label>
          <Input 
            placeholder={"Текст..."}
            value={serviceStore.item.id}
            onChange={e => {
              serviceStore.item.id = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Наименование</Label>
          <Input 
            placeholder={"Текст..."}
            value={serviceStore.item.name}
            onChange={e => {
              serviceStore.item.name = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Описание</Label>
          <Input 
            rows={4}
            type="textarea" 
            value={serviceStore.item.description}
            onChange={e => {
              serviceStore.item.description = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Стоимость (руб)</Label>
          <Input 
            value={serviceStore.item.amount}
            onChange={e => {
              serviceStore.item.amount = e.target.value;
            }}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color={"secondary"} onClick={props.toggle}>
          Отмена
        </Button>
        <Button color={"primary"} onClick={async () => {
          await serviceStore.save();
          props.onSave();
          props.toggle();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})