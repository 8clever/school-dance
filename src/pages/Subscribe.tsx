import React from "react";
import { Base, BigRow, BigButtonCol, Icon } from "../components";
import { userStore } from "../store/UserStore";
import { subscribeStore } from "../store/SubscribeStore"
import { SubscribeEdit } from "../components/SubscribeEdit";
import { routerStore } from "../store/RouterStore";
import { observer } from "mobx-react-lite";

const padding = "150px 60px"

interface SubscribeMenuProps {
  active?: string;
}

export const SubscribeMenu = observer((props: SubscribeMenuProps) => {
  const [ addVisible, setAddVisible ] = React.useState(false);

  React.useEffect(() => {
    subscribeStore.loadItems({});
  }, []);

  return (
    <BigRow 
      style={{ fontFamily: "Styled Font" }}
      maxRowItems={3}>
      {
        subscribeStore.itemList.map(i => {
          return (
            <BigButtonCol 
              onClick={() => {
                routerStore.push(`/subscribe/${i._id}`)
              }}
              padding={padding}
              key={i._id as string}>
              <div style={{
                fontWeight: props.active === i._id ? 600 : undefined
              }}>
                {i.name}
              </div>
            </BigButtonCol>
          )
        })
      }

      {
        userStore.isAdmin() ?
          <BigButtonCol 
            onClick={() => {
              setAddVisible(true);
            }}
            padding={padding}>
            <Icon type="plus" /> АБОНЕМЕНТ
          </BigButtonCol>
        : null
      }

      <SubscribeEdit 
        visible={addVisible}
        toggle={() => setAddVisible(!addVisible)}
      />

    </BigRow>
  )
})

export const Subscribe = () => {
  return (
    <Base>
      <SubscribeMenu />
    </Base>
  )
}