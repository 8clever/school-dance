import React from "react";
import { Base, BigRow, BigCol, Icon, FlexCol, BigButtonColMin } from "../components";
import { subscribeStore } from "../store/SubscribeStore";
import { Col, Button } from "reactstrap";
import { imageStore } from "../store/ImageStore";
import { userStore } from "../store/UserStore";
import { observer } from "mobx-react-lite";
import { PriceEdit } from "../components/PriceEdit";
import { priceStore } from "../store/PriceStore";
import { Carousel } from "../components/Carousel";
import { SubscribeMenu } from "./Subscribe";

interface PricesProps {
  id: string;
}

export const Prices = observer((props: PricesProps) => {
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

              {
                userStore.isAdmin() ?
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() => {
                      setAddPriceVisible(true)
                    }}
                  >
                    <Icon type="plus" /> Цена
                  </Button> : null
              }

              <PriceEdit 
                _idsubscribe={props.id}
                visible={addPriceVisible}
                toggle={() => setAddPriceVisible(!addPriceVisible)}
              />
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
    </Base>
  )
})