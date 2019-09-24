import React from "react";
import { Base, BigRow, BigButtonCol, Icon } from "../components";
import { PageTitle } from "../components/PageTitle";
import { userStore } from "../store/UserStore";
import { subscribeStore } from "../store/SubscribeStore"
import { SubscribeEdit } from "../components/SubscribeEdit";

const padding = "150px 60px"

export const Subscribe = () => {
  const [ addVisible, setAddVisible ] = React.useState(false);

  React.useEffect(() => {
    subscribeStore.loadItems({});
  }, []);

  return (
    <Base>
      <PageTitle>ЦЕНЫ</PageTitle>
      <BigRow>

        {
          subscribeStore.itemList.length && subscribeStore.itemList.map(i => {
            return (
              <BigButtonCol 
                padding={padding}
                key={i._id as string}>
                {i.name}
              </BigButtonCol>
            )
          })
        }

        {
          userStore.isAdmin() ?
          <>
            <BigButtonCol 
              onClick={() => {
                setAddVisible(true);
              }}
              padding={padding}>
              <Icon type="plus" /> АБОНЕМЕНТ
            </BigButtonCol>
          </> : null
        }
      </BigRow>

      <SubscribeEdit 
        visible={addVisible}
        toggle={() => setAddVisible(!addVisible)}
      />
    </Base>
  )
}