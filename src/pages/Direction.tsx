import React from "react";
import { observer } from "mobx-react-lite";
import { Base, BigRow, BigCol, BigButtonCol, Icon, BigButtonColMin } from "../components";
import { directionStore } from "../store/DirectionStore";
import { imageStore } from "../store/ImageStore";
import { userStore } from "../store/UserStore";
import { routerStore } from "../store/RouterStore";
import { HeaderCalendar } from "../components/HeaderCalendar";
import { DirectionEdit } from "../components/DirectionEdit";
import MD from "react-markdown";
import { Carousel } from "../components/Carousel";
import { Col, Row } from "reactstrap";
import { teacherStore } from "../store/TeacherStore";
import { performanceStore } from "../store/PerformanceStore";
import { artistStore } from "../store/ArtistStore";
import _ from "lodash";
import { toJS } from "mobx";

interface DirectionProps {
  id?: string;
}

interface Element {
  _id?: string,
  images: string[],
  title: string;
  description: string;
}

const typeMap = {
  teachers: {
    name: "ПЕДАГОГИ",
    getItems: () => teacherStore.itemList.map(t => {
      return {
        _id: t._id as string,
        images: t.images as string[],
        title: t.fullName,
        description: t.description
      }
    }),
    loadItems: teacherStore.loadItems
  },
  artists: {
    name: "АРТИСТЫ",
    getItems: () => artistStore.itemList.map(a => {
      return {
        _id: a._id as string,
        images: a.images as string[],
        title: a.name,
        description: a.description
      }
    }),
    loadItems: artistStore.loadItems
  },
  performance: {
    name: "СПЕКТАКЛИ",
    getItems: () => performanceStore.itemList.map(i => {
      return {
        _id: i._id as string,
        images: i.images as string[],
        title: i.name,
        description: i.description
      }
    }),
    loadItems: performanceStore.loadItems
  }
}

export const DirectionMenu = observer(() => {
  const [ directionEditVisible, setDirectionEditVisible ] = React.useState(false);

  React.useEffect(() => {
    directionStore.loadItems();
  }, []);

  return (
    <>
      <BigRow 
        style={{
          fontFamily: "Styled Font"
        }}
        maxRowItems={3}>
        {
          directionStore.itemList.map(d => {
            return (
              <BigButtonCol 
                key={d._id as string}
                selected={d._id === (directionStore.item && directionStore.item._id)}           
                onClick={() => routerStore.push("/directions/" + d._id)}>
                {d.name}
              </BigButtonCol>
            )
          })
        }
        {
          userStore.isAdmin() ?
          <BigButtonCol 
            onClick={() => setDirectionEditVisible(true)}>
            <Icon type="plus" /> ДОБАВИТЬ НАПРАВЛЕНИЕ
          </BigButtonCol> : null
        }      
      </BigRow>

      <DirectionEdit 
        visible={directionEditVisible}
        toggle={() => setDirectionEditVisible(!directionEditVisible)}
      />
    </>
  )
})

export const Direction = observer((props: DirectionProps) => {

  const [ visibleDirection, setVisibleDirection ] = React.useState(false);
  const [ date, setDate ] = React.useState(new Date());
  const [ visibleDescription, setVisibleDescription ] = React.useState(false);
  const [ visibleSubmenu, setVisibleSubmenu ] = React.useState(false);
  const [ element, setElement ] = React.useState<Element>({ images: [], title: "", description: "" });
  const [ submenuOptions, setSubmenuOptions ] = React.useState<Element[]>([]);

  directionStore.item = directionStore.item || {} as any;
  directionStore.item.submenu = directionStore.item.submenu || {
    type: "performance",
    items: []
  }

  React.useEffect(() => {
    directionStore.loadItem(props.id).then(() => {
      if (!directionStore.item) return;
      setElement({
        images: directionStore.item.images as string[],
        title: directionStore.item.name,
        description: directionStore.item.desc
      });
    });
  }, [props.id]);

  const type = typeMap[directionStore.item && directionStore.item.submenu.type];
  React.useEffect(() => {
    if (!type) return;
    type.loadItems().then(() => {
      setSubmenuOptions(type.getItems());
    });
  }, [type])

  const submenu = submenuOptions.map(o => {
    return (
      <BigButtonColMin
        key={o._id}
        onClick={() => {
          setElement(o);
          setVisibleSubmenu(false);
          setVisibleDescription(false);
        }}
        style={{
          borderLeft: "none",
          borderTop: "none"
        }}
        selected={element._id === o._id}
        xs={12}
        md={12}>
        {o.title}
      </BigButtonColMin>
    )
  });

  return (
    <Base>
      <HeaderCalendar 
        date={date}
        onChange={setDate}
        leftButtonText={typeMap[directionStore.item.submenu.type].name}
        leftButtonOnClick={() => setVisibleSubmenu(!visibleSubmenu)}
        rightButtonText={element.title}
        format="MM.YYYY"
        step="month"
        rightButtonOnClick={() => setVisibleDescription(!visibleDescription)}
      />

      {
        visibleSubmenu ?
        <BigRow className="d-block d-md-none">
          {submenu}
        </BigRow> : null
      }

      {/** direction view */}
      <BigRow>
        <BigCol md={12} xs={12}>

          <div className="absolute-container d-none d-md-block">
            <Row noGutters className="h-100">
              {
                visibleSubmenu ?
                <Col className="col-md-4 bg-white h-100" style={{
                  borderRight: "1px solid black"
                }}>
                  {submenu}
                </Col> : null
              }

              {
                visibleDescription ?
                <Col className="col-md-4 ml-auto h-100 bg-white" style={{
                  borderLeft: "1px solid black"
                }}>
                  <div className="p-5">
                    <MD source={element.description} />
                  </div>
                </Col> : null
              } 
              
            </Row>
          </div>

          <Carousel 
            items={element.images.map(i => {
            return { src: `${imageStore.endpoint}${i}` };
          })} />
        </BigCol>
      </BigRow>

      <DirectionMenu />

      <BigRow 
        style={{ fontFamily: "Styled Font" }}
        maxRowItems={3}>

        {
          userStore.isAdmin() ?
          <>
            <BigButtonCol onClick={async () => {
              setVisibleDirection(true);
            }}>
              <Icon type="pencil-alt" /> Редактировать направление
            </BigButtonCol>
            <BigButtonCol onClick={async () => {
              await directionStore.remove(props.id);
              routerStore.push("/");
            }}>
              <Icon type="trash" /> Удалить направление
            </BigButtonCol>
          </>
          : null
        }

      </BigRow>

      <DirectionEdit 
        visible={visibleDirection}
        toggle={() => setVisibleDirection(!visibleDirection)}
        _id={props.id}
      />
 
    </Base>
  )
})