import React from "react";
import { Base, BigRow, BigButtonCol, Icon } from "../components";
import { userStore } from "../store/UserStore";
import { subscribeStore } from "../store/SubscribeStore"
import { SubscribeEdit } from "../components/SubscribeEdit";
import { routerStore } from "../store/RouterStore";
import { observer } from "mobx-react-lite";
import { getMenu, getMenuTop } from "./Direction";
import { Subscribe as SubscribeModel } from "../../server/models/Subscribe";
import _ from "lodash";
import { PageBreadcrumbs } from "../components/PageTitle";


interface SubscribeMenuItemProps {
  subscribe: SubscribeModel,
  key?: string | number,
  active?: string;
  onClick?: () => void;
}

export const SubscribeMenuItem = (props: SubscribeMenuItemProps) => {
  const i = props.subscribe;

  return (
    <BigButtonCol 
      style={{
        fontFamily: "Styled Font"
      }}
      onClick={() => {
        routerStore.push(`/subscribe/${i._id}`);
        setTimeout(() => {
          const $el = document.querySelector(`[data-spy="scroll"] #item-${i._id}`);
          if ($el) {
            $el.scrollIntoView({ behavior: "smooth"});
          }
        }, 100);
      }}
      selected={props.active === i._id}
      key={i._id as string}>

      <div 
        id={`item-${i._id}`} 
        style={{
          position: "absolute",
          top: -120
        }} 
      />

      {i.name}

      {
        userStore.isAdmin() ?
        <span className="hovered">
          <Icon
            className="ml-3"
            type="pencil-alt"
            onClick={(e) => {
              e.stopPropagation();
              props.onClick && props.onClick();
            }}
          />
          <Icon 
            onClick={async e => {
              e.stopPropagation();
              await subscribeStore.removeItemByID(i._id as string);
              await subscribeStore.loadItems();
            }}
            type="trash"
            className="ml-3" 
          />
        </span> : null
      }
    </BigButtonCol>
  )
}

interface SubscribeMenuProps {
  active?: string;
}

export const SubscribeMenuTop = observer((props: SubscribeMenuProps) => {
  const [ editVisible, setEditVisible ] = React.useState(false);
  const [ id, setId ] = React.useState("");

  React.useEffect(() => {
    subscribeStore.loadItems({});
  }, []);

  const { mobile, desktop } = getMenuTop({
    ids: subscribeStore.itemList.map(i => i._id as string),
    selected: props.active
  });

  const getItems = (ids: string[]) => {
    return ids.map((id, idx) => {
      const subscribe = _.find(subscribeStore.itemList, _.matches({ _id: id }));
      if (!subscribe) return;

      return SubscribeMenuItem({
        active: props.active,
        subscribe,
        key: idx,
        onClick: () => {
          setId(id);
          setEditVisible(true);
        }
      })
    })
  }

  return (
    <>
      <div className="d-md-none" data-spy="scroll">
        {getItems(mobile)}
      </div>

      <div className="d-none d-md-block">
        <BigRow maxRowItems={3}>
          {getItems(desktop)}
        </BigRow>
      </div>

      <SubscribeEdit 
        _id={id}
        visible={editVisible}
        toggle={() => setEditVisible(!editVisible)}
      />
    </>
  )
})

export const SubscribeMenu = observer((props: SubscribeMenuProps) => {
  const [ editVisible, setEditVisible ] = React.useState(false);
  const [ id, setId ] = React.useState("");

  React.useEffect(() => {
    subscribeStore.loadItems({});
  }, []);

  const { mobile, desktop } = getMenu({
    ids: subscribeStore.itemList.map(i => i._id as string),
    selected: props.active
  });
  let addSubscribe = null;

  const getItems = (ids: string[]) => {
    return ids.map((id, idx) => {
      const subscribe = _.find(subscribeStore.itemList, _.matches({ _id: id }));
      if (!subscribe) return;

      return SubscribeMenuItem({
        subscribe,
        key: idx,
        onClick: () => {
          setId(id);
          setEditVisible(true);
        }
      })
    })
  }

  if (userStore.isAdmin()) {
    addSubscribe = (
      <BigButtonCol 
        style={{
          fontFamily: "Styled Font"
        }}
        onClick={() => {
          setId("")
          setEditVisible(true)
        }}>
        <Icon type="plus" className="mr-3" /> 
        АБОНЕМЕНТ
      </BigButtonCol>
    )
  }

  return (
    <>
      <div className="d-md-none" data-spy="scroll">
        {getItems(mobile)}
        {addSubscribe}
      </div>

      <div className="d-none d-md-block">
        <BigRow maxRowItems={3}>
          {getItems(desktop)}
          {addSubscribe}
        </BigRow>
      </div>

      <SubscribeEdit 
        _id={id}
        visible={editVisible}
        toggle={() => setEditVisible(!editVisible)}
      />
    </>
  )
})

export const Subscribe = () => {
  return (
    <Base>

      <PageBreadcrumbs 
        items={[
          {
            title: "Цены"
          }
        ]}
      />

      <SubscribeMenu />
    </Base>
  )
}