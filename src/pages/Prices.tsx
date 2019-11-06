import React from "react";
import { Base, BigRow, BigCol, BigButtonCol, Icon, FlexCol, BigButtonColMin } from "../components";
import { subscribeStore } from "../store/SubscribeStore";
import { Col } from "reactstrap";
import { imageStore } from "../store/ImageStore";
import { userStore } from "../store/UserStore";
import { routerStore } from "../store/RouterStore";
import { observer } from "mobx-react-lite";
import { SubscribeEdit } from "../components/SubscribeEdit";
import { PriceEdit } from "../components/PriceEdit";
import { priceStore } from "../store/PriceStore";
import { Carousel } from "../components/Carousel";
import { SubscribeMenu } from "./Subscribe";

interface PricesProps {
  id: string;
}

export const Prices = observer((props: PricesProps) => {
  const [ editSubscribeVisible, setEditSubscribeVisible ] = React.useState(false);
  const [ addPriceVisible, setAddPriceVisible ] = React.useState(false);

  React.useEffect(() => {
    subscribeStore.loadItem(props.id);
    priceStore.loadItems({
      _idsubscribe: props.id
    });
  }, [props.id]);

  const subscribe = subscribeStore.item;
  if (!subscribe) return null;

  return (
    <Base>
      <BigRow>
        <BigCol md={7} lg={8}>
          <Carousel 
            items={subscribe.images.map(i => {
            return { src: `${imageStore.endpoint}${i}` };
          })} />
        </BigCol>
        <Col md={5} lg={4}>
          <FlexCol column justify="between">
            <div className="p-5">
              <h4 className="mb-5">
                {subscribe.name}
              </h4>
              {
                priceStore.itemList.map(i => {
                  return (
                    <p key={i._id as string}>
                      {i.description} - <b>{i.price}р.</b>
                      {
                        userStore.isAdmin() ?
                        <>
                          {" "} 
                          <Icon
                            onClick={async () => {
                              await priceStore.removeItemByID(i._id as string)
                              await priceStore.loadItems({ _idsubscribe: props.id });
                            }}
                            style={{ cursor: "pointer" }} 
                            className="text-danger" 
                            type="trash" 
                          />
                        </> : null
                      }
                    </p>
                  )
                })
              }
            </div>
            <div>
              <BigButtonColMin 
                onClick={() => {
                  window.open(subscribeStore.item.paymentLink)
                }}
                md={12}>
                ОПЛАТИТЬ
              </BigButtonColMin>
            </div>
          </FlexCol>
        </Col>
      </BigRow>

      <SubscribeMenu active={props.id} />

      {
        userStore.isAdmin() ?
        <BigRow>
          <BigButtonCol
            onClick={() => {
              setAddPriceVisible(true)
            }}
          >
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
            routerStore.push("/subscribe")
          }}>
            <Icon type="trash" /> Удалить
          </BigButtonCol>
        </BigRow> : null
      }

      <PriceEdit 
        _idsubscribe={props.id}
        visible={addPriceVisible}
        toggle={() => setAddPriceVisible(!addPriceVisible)}
      />

      <SubscribeEdit 
        _id={props.id}
        visible={editSubscribeVisible}
        toggle={() => setEditSubscribeVisible(!editSubscribeVisible)}
      />
    </Base>
  )
})