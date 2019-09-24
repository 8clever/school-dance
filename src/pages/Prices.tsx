import React from "react";
import { Base, BigRow, BigCol, BigButtonCol, Icon } from "../components";
import { subscribeStore } from "../store/SubscribeStore";
import { PageTitle } from "../components/PageTitle";
import { UncontrolledCarousel } from "reactstrap";
import { imageStore } from "../store/ImageStore";
import { userStore } from "../store/UserStore";
import { routerStore } from "../store/RouterStore";
import { observer } from "mobx-react-lite";
import { SubscribeEdit } from "../components/SubscribeEdit";

interface PricesProps {
  id: string;
}

export const Prices = observer((props: PricesProps) => {
  const [ editSubscribeVisible, setEditSubscribeVisible ] = React.useState(false);

  React.useEffect(() => {
    subscribeStore.loadItem(props.id);
  }, [props.id]);

  const subscribe = subscribeStore.item;
  if (!subscribe) return null;

  return (
    <Base>
      <PageTitle>{subscribe.name}</PageTitle>
      <BigRow>
        <BigCol md={7} lg={8}>
          <UncontrolledCarousel 
            items={subscribe.images.map(i => {
            return { src: `${imageStore.endpoint}${i}` };
          })} />
        </BigCol>
        <BigCol md={5} lg={4}>
          <div style={{ padding: 50 }}>

          </div>
        </BigCol>
      </BigRow>

      {
        userStore.isAdmin() ?
        <BigRow>
          <BigButtonCol>
            <Icon type="plus" /> Цена
          </BigButtonCol>
          <BigButtonCol onClick={async () => {
            setEditSubscribeVisible(true);
          }}>
            <Icon type="pencil-alt" /> Редактировать
          </BigButtonCol>
          <BigButtonCol onClick={async () => {
            await subscribeStore.removeItemByID(props.id);
            await subscribeStore.loadItems({});
            routerStore.history.push("/subscribe")
          }}>
            <Icon type="trash" /> Удалить
          </BigButtonCol>
        </BigRow> : null
      }

      <SubscribeEdit 
        _id={props.id}
        visible={editSubscribeVisible}
        toggle={() => setEditSubscribeVisible(!editSubscribeVisible)}
      />
    </Base>
  )
})