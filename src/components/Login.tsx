import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Icon } from "./Icon";
import { userStore } from "../store/UserStore";

interface LoginProps {
  visible: boolean;
  toggle: () => void;
}

export const Login = (props: LoginProps) => {

  const [ login, setLogin ] = React.useState("");
  const [ password, setPassword ] = React.useState("");

  return (
    <>
      <Modal 
        isOpen={props.visible} 
        toggle={props.toggle} >
        <ModalHeader toggle={props.toggle}>
          Авторизация
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Логин</Label>
            <Input 
              placeholder="Текст..."
              value={login}
              onChange={e => {
                setLogin(e.target.value);
              }}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Пароль</Label>
            <Input 
              onChange={e => {
                setPassword(e.target.value);
              }}
              value={password}
              type="password"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggle}>
            Отмена
          </Button>
          {" "}
          <Button color="primary" onClick={() => {
            userStore.login(login, password).then(() => {
              setPassword("");
              setLogin("");
              props.toggle();
            })
          }}>
            Вход <Icon type="sign-in-alt" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}