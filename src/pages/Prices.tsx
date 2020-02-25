import React from "react";
import { Base, BigRow, FlexCol, BigButtonColMin, Icon, BigHr, getShadowBoxStyle } from "../components";
import { subscribeStore } from "../store/SubscribeStore";
import { Col } from "reactstrap";
import { imageStore } from "../store/ImageStore";
import { priceStore } from "../store/PriceStore";
import { Carousel } from "../components/Carousel";
import { PageBreadcrumbs } from "../components/PageTitle";
import { Element } from "./Direction";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { userStore } from "../store/UserStore";
import MD from "react-markdown";
import { PriceEdit } from "../components/PriceEdit";

interface PricesProps {
  id: string;
}

export const Prices = observer((props: PricesProps) => {
  const [ priceModal, setPriceModal ] = React.useState({
    visible: false,
    id: ""
  });
  const [ element, setElement ] = React.useState<Element>({ images: [], title: "", description: "" });
  const [ submenuOptions, setSubmenuOptions ] = React.useState<Element[]>([]);

  const loadPrices = async () => {
    await priceStore.loadItems({ _idsubscribe: props.id }),
    setSubmenuOptions(priceStore.itemList.map(p => {
      return {
        _id: p._id as string,
        title: p.name,
        description: p.description,
        images: subscribeStore.item.images as string[]
      }
    }));
  }

  React.useEffect(() => {
    (async () => {
      await Promise.all([
        subscribeStore.loadItem(props.id),
        userStore.isLoggedin()
      ])

      const subscribe = toJS(subscribeStore.item);
      setElement({
        title: subscribe.name,
        description: subscribe.description,
        images: subscribe.images as string[]
      });
      await loadPrices();
    })();
  }, [props.id]);

  const submenu = submenuOptions.map(o => {
    return (
      <BigButtonColMin
        key={o._id}
        onClick={async () => {
          setElement(o);
        }}
        style={{
          border: "none",
        }}
        selected={element._id === o._id}
        xs={12}
        md={12}>
        {o.title}

        {
          userStore.isAdmin() ?
          <span className="hovered">
            <Icon 
              onClick={e => {
                e.preventDefault();
                setPriceModal({
                  id: o._id,
                  visible: true
                })
              }}
              className="ml-3"
              type="pencil-alt" />
            <Icon 
              onClick={async e => {
                e.preventDefault();
                await priceStore.removeItemByID(o._id);
                await loadPrices();
              }}
              className="ml-3"
              type="trash" 
            />
          </span> : null
        }
      </BigButtonColMin>
    )
  });

  if (userStore.isAdmin()) {
    submenu.push(
      <BigButtonColMin
        key={"add-price"}
        onClick={async () => {
          setPriceModal({
            id: "",
            visible: true
          })
        }}
        style={{
          border: "none",
        }}
        xs={12}
        md={12}>
        <Icon type="plus" className="mr-2" />
        ДОБАВИТЬ ЦЕНУ
      </BigButtonColMin>
    )
  }

  const ticketBuy = (
    <BigRow>
      <BigButtonColMin 
        style={{
          borderLeft: "none"
        }}
        md={12}>
        ОПЛАТИТЬ
      </BigButtonColMin>
    </BigRow>
  )

  const description = (
    <div className="p-5">
      <MD source={element.description} />
    </div>
  )

  const descriptionMobile = (
    <FlexCol justify="between" column>
      {description}
      {ticketBuy}
    </FlexCol>
  )

  const descriptionDesktop = (
    <FlexCol justify="between" column>
      <div style={{ 
        position: "relative",
        justifySelf: "stretch",
        height: "100%"
      }}>
        <div className="absolute-container" style={{ overflow: "auto" }}>
          {description}
        </div>
      </div>
      {ticketBuy}
    </FlexCol>
  )

  if (!subscribeStore.item) return null;

  return (
    <Base>

      <PageBreadcrumbs 
        items={[
          {
            title: "Цены",
            url: "/subscribe"
          },
          {
            title: subscribeStore.item.name
          }
        ]}
      />

      <div 
        className="d-block d-md-none w-100" 
        style={{ borderLeft: "1px solid black" }}>
        {descriptionMobile}
      </div>

      <div 
        className="d-block d-md-none w-100" 
        style={{ borderLeft: "1px solid black" }}>
        {submenu}
      </div> 
      
      <BigHr />

      {/** direction view */}
      <BigRow style={{ position: "relative" }}>
        <Col
          md={4}
          style={getShadowBoxStyle({ top: 0 })}
          className="absolute-container bg-white d-none d-md-block">
          {submenu}
        </Col>

        <Col 
          style={getShadowBoxStyle({ top: 0 })}
          md={12} 
          xs={12}>

          <Carousel 
            items={
              element.images.map(i => {
                return { src: `${imageStore.endpoint}${i}` };
              })
            } 
          />
        </Col>
        
        <Col
          md={4}
          style={getShadowBoxStyle({ top: 0 })}
          className="absolute-container bg-white offset-8 d-none d-md-block">
          {descriptionDesktop}
        </Col>
      </BigRow>

      <PriceEdit 
        _id={priceModal.id}
        visible={priceModal.visible}
        _idsubscribe={subscribeStore.item._id as string}
        toggle={() => setPriceModal({ ...priceModal, visible: false })}
        onSave={() => loadPrices()}
      />
    </Base>
  )
})