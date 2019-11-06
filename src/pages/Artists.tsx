import React from "react";
import { Base, BigRow, BigButtonColMin, Icon, BigButtonCol, BigCol } from "../components";
import { Carousel } from "../components/Carousel";
import { observer } from "mobx-react-lite";
import { artistStore } from "../store/ArtistStore";
import { userStore } from "../store/UserStore";
import { Row, Col } from "reactstrap";
import { ArtistEdit } from "../components/ArtistEdit";
import { imageStore } from "../store/ImageStore";
import { routerStore } from "../store/RouterStore";

interface ArtistsProps {
  id?: string;
}

export const Artists = observer((props: ArtistsProps) => {

  const [ addVisible, setAddVisible ] = React.useState(false);
  const [ editVisible, setEditVisible ] = React.useState(false);

  React.useEffect(() => {
    artistStore.loadItems();
  }, []);

  React.useEffect(() => {
    if (!props.id) return;
    artistStore.loadItem(props.id);
  }, [props.id]);

  const item = artistStore.item || artistStore.itemList[0];
  const images = item ? item.images : [];

  return (
    <Base>
      <Row noGutters>
        <Col md={3}>
          {
            artistStore.itemList.map(i => {
              return (
                <BigButtonColMin 
                  onClick={() => {
                    routerStore.push(`/artist/${i._id}`)
                  }}
                  key={i._id as string} 
                  md={12}>
                  {i.name}
                </BigButtonColMin>
              )
            })
          }

          {
            userStore.isAdmin() ?
            <BigButtonColMin 
              onClick={() => {
                setAddVisible(true);
              }}
              md={12}>
              <Icon type="plus" />
              {" "}
              Добавить артиста
            </BigButtonColMin> : null
          }
        </Col>
        <BigCol md={9}>
          <Carousel items={images.map(i => {
            return {
              src: `${imageStore.endpoint}${i}`
            }
          })} />
        </BigCol>
      </Row>

      {
        userStore.isAdmin() && item && item._id ?
        <>
          <BigRow>
            <BigButtonCol onClick={() => {
              setEditVisible(true);
            }}>
              <Icon type="pencil-alt" />
              {" "} Редактировать
            </BigButtonCol>
            <BigButtonCol onClick={async () => {
              await artistStore.remove(item._id as string);
              await artistStore.loadItems();

              if (artistStore.itemList[0]) {
                routerStore.push("/artist/" + artistStore.itemList[0]._id);
                return;
              }

              routerStore.push("/artists");
            }}>
              <Icon type="trash" />
              {" "} Удалить
            </BigButtonCol>
          </BigRow> 

          <ArtistEdit 
            toggle={() => {
              setEditVisible(!editVisible)
            }}
            onSave={() => {
              artistStore.loadItems();
            }}
            onCancel={() => {}}
            _id={item._id as string}
            visible={editVisible}
          />
        </>: null
      }

      <ArtistEdit 
        visible={addVisible}
        toggle={() => {
          setAddVisible(!addVisible);
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