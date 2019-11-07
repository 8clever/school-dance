import React from "react";
import { Base, BigRow, Icon, BigButtonCol } from "../components";
import { observer } from "mobx-react-lite";
import { artistStore } from "../store/ArtistStore";
import { userStore } from "../store/UserStore";
import { ArtistEdit } from "../components/ArtistEdit";

interface ArtistsProps {
  id?: string;
}

export const Artists = observer((props: ArtistsProps) => {

  const [ editVisible, setEditVisible ] = React.useState(false);
  const [ id, setId ] = React.useState("");

  React.useEffect(() => {
    artistStore.loadItems();
  }, []);

  return (
    <Base>
      <BigRow noGutters>
          {
            artistStore.itemList.map(i => {
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
                          await artistStore.remove(i._id as string);
                          await artistStore.loadItems();
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
              Добавить артиста
            </BigButtonCol> : null
          }
        </BigRow>

      <ArtistEdit 
        _id={id}
        visible={editVisible}
        toggle={() => {
          setEditVisible(!editVisible)
        }}
        onSave={() => {
          artistStore.loadItems();
        }}
        onCancel={() => {

        }}
      />
    </Base>
  )
})