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
  const [ visiblePriceModal, setVisiblePriceModal ] = React.useState(false);
  const [ priceId, setPriceId ] = React.useState("");

  React.useEffect(() => {
    subscribeStore.loadItem(props.id);
    priceStore.loadItems({
      _idsubscribe: props.id
    });
  }, [props.id]);

  const subscribe = subscribeStore.item;
  if (!subscribe) return null;

  const prices = (
    <>
      <div className="p-5" style={{ borderLeft: "1px solid black" }}>
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
                    <Icon 
                      onClick={() => {
                        setPriceId(i._id as string);
                        setVisiblePriceModal(true);
                      }}
                      className="ml-3"
                      style={{ cursor: "pointer" }}
                      type="pencil-alt"
                    />

                    <Icon
                      onClick={async () => {
                        await priceStore.removeItemByID(i._id as string)
                        await priceStore.loadItems({ _idsubscribe: props.id });
                      }}
                      className="ml-3"
                      style={{ cursor: "pointer" }} 
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
                setPriceId("")
                setVisiblePriceModal(true)
              }}
            >
              <Icon type="plus" /> Цена
            </Button> : null
        }

        <PriceEdit 
          _id={priceId}
          _idsubscribe={props.id}
          visible={visiblePriceModal}
          toggle={() => setVisiblePriceModal(!visiblePriceModal)}
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
    </>
  )

  return (
    <Base>
      <BigRow>
        <BigCol md={8}>
          <Carousel 
            items={subscribe.images.map(i => {
            return { src: `${imageStore.endpoint}${i}` };
          })} />
        </BigCol>
        <Col md={4} className="d-none d-md-block">
          <div className="absolute-container" style={{ overflow: "auto" }}>
            <FlexCol column justify="between">
              {prices}
            </FlexCol>
          </div>
        </Col>
      </BigRow>

      <div className="d-md-none">
        {prices}
      </div>

      <SubscribeMenu active={props.id} />
    </Base>
  )
})