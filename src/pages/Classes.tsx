import React from "react";
import { Base, BigRow, Icon, BigButtonCol } from "../components";
import { observer } from "mobx-react-lite";
import { userStore } from "../store/UserStore";
import { classStore } from "../store/ClassStore";
import { ClassEdit } from "../components/ClassEdit";

export const Classes = observer(() => {

  const [ editVisible, setEditVisible ] = React.useState(false);
  const [ id, setId ] = React.useState("");

  React.useEffect(() => {
    classStore.loadItems({}, { name: 1 });
  }, []);

  return (
    <Base>
      <BigRow noGutters>
          {
            classStore.itemList.map(i => {
              return (
                <BigButtonCol 
                  key={i._id as string}>
                  {i.name}
                  {
                    userStore.isAdmin() ?
                    <span className="hovered">
                      <Icon 
                        type="pencil-alt" 
                        className="ml-3"
                        onClick={e => {
                          e.stopPropagation();
                          setId(i._id as string);
                          setEditVisible(true);
                      }} />
                      <Icon 
                        className="ml-3"
                        type="trash" 
                        onClick={async e => {
                          e.stopPropagation();
                          await classStore.remove(i._id as string);
                          await classStore.loadItems();
                      }} />
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
              Добавить класс
            </BigButtonCol> : null
          }
        </BigRow>

      <ClassEdit 
        _id={id}
        visible={editVisible}
        toggle={() => {
          setEditVisible(!editVisible)
        }}
        onSave={() => {
          classStore.loadItems({}, { name: 1 });
        }}
        onCancel={() => {

        }}
      />
    </Base>
  )
})