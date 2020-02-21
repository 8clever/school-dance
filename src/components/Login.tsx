import React from "react";
import {
  Button,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Icon } from "./Icon";
import { userStore } from "../store/UserStore";
import { routerStore } from "../store/RouterStore";

interface LoginProps {}

export const Login = (props: LoginProps) => {

  const [ login, setLogin ] = React.useState("");
  const [ password, setPassword ] = React.useState("");

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        padding: 50,
        border: "1px solid gray",
        width: 500,
      }}>
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
        <div style={{
          textAlign: "right"
        }}>
          <Button color="secondary" onClick={() => {
            routerStore.push("/")
          }}>
            Отмена
          </Button>
          {" "}
          <Button color="primary" onClick={async () => {
            setPassword("");
            setLogin("");

            await userStore.login(login, password);
            await userStore.isLoggedin();
            routerStore.push("/admin")
          }}>
            Вход <Icon type="sign-in-alt" />
          </Button>
        </div>
      </div>
    </div>
  )
}