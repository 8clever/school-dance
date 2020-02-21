import React from "react";
import { Base, BigRow, BigButtonCol } from "../components";
import { routerStore } from "../store/RouterStore";
import { observer } from "mobx-react-lite";
import { userStore } from "../store/UserStore";
import { HomePageEdit } from "../components/HomePageEdit";

export const Admin = observer(() => {
  const [ homePageEditVisible, setHomePageEditVisible ] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      await userStore.isLoggedin();
      if (userStore.isAdmin()) return;
      routerStore.push("/auth");
    })()
  }, []);

  return (
    <Base>
      <BigRow>
        <BigButtonCol
          onClick={() => routerStore.push("/directions")}>
          Направления
        </BigButtonCol>
        <BigButtonCol
          onClick={() => routerStore.push("/artists")}>
          Артисты
        </BigButtonCol>
        <BigButtonCol
          onClick={() => routerStore.push("/performance")}>
          Спектакли
        </BigButtonCol>
        <BigButtonCol
          onClick={() => routerStore.push("/classes")}>
          Классы
        </BigButtonCol>
        <BigButtonCol
          onClick={() => routerStore.push("/teachers")}>
          Преподаватели
        </BigButtonCol>
        <BigButtonCol
          onClick={() => routerStore.push("/leaders")}>
          Руководители
        </BigButtonCol>
        <BigButtonCol
          onClick={() => routerStore.push("/subscribe")}>
          Цены
        </BigButtonCol>
        <BigButtonCol onClick={() => setHomePageEditVisible(true)}>
          ДОМАШНЯЯ СТРАНИЦА
        </BigButtonCol>
      </BigRow>

      <HomePageEdit 
        visible={homePageEditVisible}
        toggle={() => setHomePageEditVisible(!homePageEditVisible)}
        onSave={() => {}}
      />
    </Base>
  )
})