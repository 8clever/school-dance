import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from "reactstrap";
import { observer } from "mobx-react-lite";
import { priceStore as globalStore, PriceStore } from "../store/PriceStore";

interface PriceEditProps {
  _id?: string;
  _idsubscribe: string;
  visible: boolean;
  toggle: () => void;
}

const localStore = new PriceStore();

export const PriceEdit = observer((props: PriceEditProps) => {

  React.useEffect(() => {
    localStore.create(props._idsubscribe);
    if (!(props.visible && props._id)) return;

    localStore.loadItem(props._id);
  }, [ props.visible, props._id ]);

  if (!localStore.item) return null;

  return (
    <Modal toggle={props.toggle} isOpen={props.visible}>
      <ModalHeader>
        {
          localStore.item._id ? 
          "Редактирование цены" : 
          "Создание цены"
        }
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Описание</Label>
          <Input 
            type="textarea"
            placeholder={"Текст..."}
            value={localStore.item.description}
            onChange={e => {
              localStore.item.description = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Цена</Label>
          <Input 
            type="number"
            placeholder={"Текст..."}
            value={localStore.item.price}
            onChange={e => {
              localStore.item.price = parseFloat(e.target.value);
            }}
          />
        </FormGroup>

      </ModalBody>
      <ModalFooter>
        <Button color={"secondary"} onClick={props.toggle}>
          Отмена
        </Button>
        <Button color={"primary"} onClick={async () => {
          await localStore.save();
          await globalStore.loadItems({
            _idsubscribe: props._idsubscribe
          });
          props.toggle();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})