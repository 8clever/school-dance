import React from "react";import { performanceStore } from "../store/PerformanceStore";
import { Base, BigRow, BigButtonCol, Icon } from "../components";
import { observer } from "mobx-react-lite";
import { userStore } from "../store/UserStore";
import { PerformanceEdit } from "../components/PerformanceEdit";

interface PerformanceProps {
  id?: string;
}

export const Performance = observer((props: PerformanceProps) => {
 
  const [ editVisible, setEditVisible ] = React.useState(false);
  const [ id, setId ] = React.useState("");

  React.useEffect(() => {
    performanceStore.loadItems();
  }, []);

  return (
    <Base>

      {/** performance view */}
      <BigRow>
        {
          performanceStore.itemList.map(i => {
            return (
              <BigButtonCol 
                key={i._id as string}>
                {i.name}

                {
                  userStore.isAdmin() ?
                  <span className="hovered">
                    <Icon 
                      onClick={e => {
                        e.stopPropagation();
                        setId(i._id as string);
                        setEditVisible(true);
                      }}
                      className="ml-3"
                      type="pencil-alt" 
                    />
                    <Icon 
                      onClick={async e => {
                        e.stopPropagation();
                        await performanceStore.remove(i._id as string);
                        await performanceStore.loadItems();
                      }}
                      className="ml-3"
                      type="trash" 
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
            Добавить артиста
          </BigButtonCol> : null
        }
      </BigRow>
      

      <PerformanceEdit 
        _id={id}
        visible={editVisible}
        toggle={() => {
          setEditVisible(!editVisible)
        }}
        onSave={() => {
          performanceStore.loadItems();
        }}
        onCancel={() => {}}
      />

    </Base>
  )
})