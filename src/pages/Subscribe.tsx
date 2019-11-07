import React from "react";
import { Base, BigRow, BigButtonCol, Icon } from "../components";
import { userStore } from "../store/UserStore";
import { subscribeStore } from "../store/SubscribeStore"
import { SubscribeEdit } from "../components/SubscribeEdit";
import { routerStore } from "../store/RouterStore";
import { observer } from "mobx-react-lite";

interface SubscribeMenuProps {
  active?: string;
}

export const SubscribeMenu = observer((props: SubscribeMenuProps) => {
  const [ editVisible, setEditVisible ] = React.useState(false);
  const [ id, setId ] = React.useState("");

  React.useEffect(() => {
    subscribeStore.loadItems({});
  }, []);

  return (
    <>
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
                selected={props.active === i._id}
                key={i._id as string}>
                {i.name}

                {
                  userStore.isAdmin() ?
                  <span className="hovered">
                    <Icon
                      className="ml-3"
                      type="pencil-alt"
                      onClick={(e) => {
                        e.stopPropagation();
                        setId(i._id as string);
                        setEditVisible(true);
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
          })
        }

        {
          userStore.isAdmin() ?
            <BigButtonCol 
              onClick={() => {
                setId("")
                setEditVisible(true);
              }}>
              <Icon type="plus" className="mr-3" /> 
              АБОНЕМЕНТ
            </BigButtonCol>
          : null
        }

      </BigRow>

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
      <SubscribeMenu />
    </Base>
  )
}