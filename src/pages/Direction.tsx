import React from "react";
import { observer } from "mobx-react-lite";
import { Base, BigRow, BigButtonCol, Icon, BigButtonColMin, BigHr } from "../components";
import { directionStore } from "../store/DirectionStore";
import { imageStore } from "../store/ImageStore";
import { userStore } from "../store/UserStore";
import { routerStore } from "../store/RouterStore";
import { DirectionEdit } from "../components/DirectionEdit";
import MD from "react-markdown";
import { Carousel } from "../components/Carousel";
import { Col, Row } from "reactstrap";
import { teacherStore } from "../store/TeacherStore";
import { performanceStore } from "../store/PerformanceStore";
import { artistStore } from "../store/ArtistStore";
import _ from "lodash";
import { CalendarMini } from "../components/CalendarMini";
import { Direction as DirectionModel } from "../../server/models/Direction";
import { toJS } from "mobx";

interface DirectionProps {
  id?: string;
}

export interface Element {
  _id?: string,
  images: string[],
  title: string;
  description: string;
}

interface TypeMap {
  [key: string]: {
    name: string;
    getItems: () => Element[],
    loadItems: (query?: object, sort?: object) => Promise<void>;
  }
}

export const typeMap: TypeMap = {
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

interface getDirectionMenuProps {
  direction: DirectionModel;
  key?: string | number;
  onClickEdit?: () => void;
}

export const DirectionMenuItem = (props: getDirectionMenuProps) => {
  const d = props.direction;

  return (
    <BigButtonCol
      style={{ fontFamily: "Styled Font" }}
      key={props.key}
      selected={d._id === (directionStore.item && directionStore.item._id)}           
      onClick={() => {
        routerStore.push("/directions/" + d._id)
        setTimeout(() => {
          const $el = document.querySelector(`[data-spy="scroll"] #item-${d._id}`);
          if ($el) {
            $el.scrollIntoView({ behavior: "smooth"});
          }
        }, 100);
      }}>
      <div 
        id={`item-${d._id}`} 
        style={{
          position: "absolute",
          top: -120
        }} />

      {d.name}

      {
        userStore.isAdmin() ?
        <span className="hovered">
          <Icon 
            onClick={e => {
              e.stopPropagation();
              props.onClickEdit && props.onClickEdit();
            }}
            type={"pencil-alt"} 
            className="ml-3" 
          />
          <Icon 
            onClick={async e => {
              e.stopPropagation();
              await directionStore.removeItemByID(d._id as string);
              await directionStore.loadItems();
            }}
            type={"trash"} 
            className="ml-3" 
          />
        </span> : null
      }
    </BigButtonCol>
  )
}

interface DirectionMenu {
  selectedId?: string;
}

export const DirectionMenuTop = observer((props: DirectionMenu) => {
  const [ directionEditVisible, setDirectionEditVisible ] = React.useState(false);
  const [ id, setId ] = React.useState("");

  if (!props.selectedId) return null;

  const mobile: DirectionModel[] = [];
  const desktop: DirectionModel[] = [];

  _.each(directionStore.itemList, (direction) => {
    const d = toJS(direction);
    const existsSelectedMobile = _.find(mobile, _.matches({ _id: props.selectedId }));
    const existsSelectedDesktop = _.find(desktop, _.matches({ _id: props.selectedId }));

    if (!existsSelectedMobile) {
      mobile.push(d);
    }

    if (
      !existsSelectedDesktop ||
      (existsSelectedDesktop && desktop.length % 3)) {
        desktop.push(d);
    }
  });

  const getItems = (directions: DirectionModel[]) => {
    return directions.map((d, idx) => {
      return DirectionMenuItem({
        direction: d,
        key: idx,
        onClickEdit: () => {
          setId(d._id as string);
          setDirectionEditVisible(true);
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

      <DirectionEdit 
        _id={id}
        visible={directionEditVisible}
        toggle={() => setDirectionEditVisible(!directionEditVisible)}
      />
    </>
  )
})

export const DirectionMenu = observer((props: DirectionMenu) => {
  const [ directionEditVisible, setDirectionEditVisible ] = React.useState(false);
  const [ id, setId ] = React.useState("");

  React.useEffect(() => {
    directionStore.loadItems();
  }, []);

  const selectedIdx = (
    props.selectedId ? 
    _.findIndex(directionStore.itemList, _.matches({ _id: props.selectedId })) :
    0
  )
  const slicedIdx = selectedIdx + 1;
  const notEnough = slicedIdx % 3;
  const notEnoughCount = 3 - notEnough;
  const slicedDesktopIdx = notEnough ? slicedIdx + notEnoughCount : slicedIdx;
  const mobile: DirectionModel[] = directionStore.itemList.slice(slicedIdx);
  const desktop: DirectionModel[] = directionStore.itemList.slice(slicedDesktopIdx);
  let addDirection = null;

  if (userStore.isAdmin()) {
    addDirection = (
      <BigButtonCol 
        style={{
          fontFamily: "Styled Font"
        }}
        onClick={() => {
          setId("")
          setDirectionEditVisible(true)
        }}>
        <Icon type="plus" className="mr-3" /> 
        ДОБАВИТЬ НАПРАВЛЕНИЕ
      </BigButtonCol>
    )
  }

  const getItems = (directions: DirectionModel[]) => {
    return directions.map((d, idx) => {
      return DirectionMenuItem({
        direction: d,
        key: idx,
        onClickEdit: () => {
          setId(d._id as string);
          setDirectionEditVisible(true);
        }
      })
    })
  }

  return (
    <>
      <div className="d-md-none">
        {getItems(mobile)}
        {addDirection}
      </div>

      <div className="d-none d-md-block">
        <BigRow 
          maxRowItems={3}>
          {getItems(desktop)}
          {addDirection}
        </BigRow>
      </div>

      <DirectionEdit 
        _id={id}
        visible={directionEditVisible}
        toggle={() => setDirectionEditVisible(!directionEditVisible)}
      />
    </>
  )
})

export const Direction = observer((props: DirectionProps) => {

  const [ date, setDate ] = React.useState(new Date());
  const [ visibleDescription, setVisibleDescription ] = React.useState(false);
  const [ visibleSubmenu, setVisibleSubmenu ] = React.useState(false);
  const [ element, setElement ] = React.useState<Element>({ images: [], title: "", description: "" });
  const [ submenuOptions, setSubmenuOptions ] = React.useState<Element[]>([]);
  const [ calendarIsVisible, setCalendarIsVisible ] = React.useState(false);

  directionStore.defaults();

  React.useEffect(() => {
    setCalendarIsVisible(false);
    setDate(new Date());
  }, [routerStore.history.location.pathname])

  React.useEffect(() => {
    setVisibleDescription(false);
    setVisibleSubmenu(false);
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
    if (!(
      directionStore.item.submenu.items.length &&
      type  
    )) {
      setSubmenuOptions([]);
      return;
    }

    type.loadItems({
      _id: {
        $in: directionStore.item.submenu.items
      }
    }).then(() => {
      setSubmenuOptions(type.getItems());
    });
  }, [type, directionStore.item.submenu.items])

  const submenu = submenuOptions.map(o => {
    return (
      <BigButtonColMin
        key={o._id}
        onClick={async () => {
          setElement(o);
          setVisibleDescription(false);
          await directionStore.loadItem(directionStore.item._id as string);
          const schedule = _.filter(directionStore.item.schedule, _.matches({ _id: o._id }));
          directionStore.item.schedule = schedule;
        }}
        style={{
          border: "none",
        }}
        selected={element._id === o._id}
        xs={12}
        md={12}>
        {o.title}
      </BigButtonColMin>
    )
  });

  const description = (
    <div className="p-5">
      <MD source={element.description} />
    </div>
  )

  const calendar = (
    <CalendarMini 
      date={date}
      onChange={(date) => {
        setDate(date)
      }}
      direction={directionStore.item}
    />
  )

  return (
    <Base>

      <DirectionMenuTop 
        selectedId={props.id}
      />

      <BigRow>
        <BigButtonColMin
          selected={visibleSubmenu}
          md={4}
          padding={"15px 0"} 
          onClick={() => {
            setVisibleSubmenu(!visibleSubmenu)
          }}>
          {typeMap[directionStore.item.submenu.type].name}
        </BigButtonColMin>

        {
          visibleSubmenu ?
          <div 
            className="d-block d-md-none w-100" 
            style={{ borderLeft: "1px solid black" }}>
            {submenu}
          </div> : null
        }

        <BigButtonColMin 
          onClick={() => {
            setCalendarIsVisible(!calendarIsVisible)
          }}
          selected={calendarIsVisible}
          md={4}>
          РАСПИСАНИЕ
        </BigButtonColMin>

        {
          calendarIsVisible ?
          <div 
            className="d-md-none w-100">
            {calendar}
          </div> : null
        }

        <BigButtonColMin 
          selected={visibleDescription}
          md={4}
          onClick={() => {
            setVisibleDescription(!visibleDescription)
          }}
          padding={"15px 0"} 
        >
          {element.title}
        </BigButtonColMin>

        {
          visibleDescription ?
          <div 
            style={{ borderLeft: "1px solid black" }}
            className="d-block d-md-none w-100">
            {description}
          </div> : null
        }

      </BigRow>
      
      {
        calendarIsVisible ?
        <Row className="relative d-none d-md-block" noGutters>
          <Col 
            style={{
              zIndex: 1000
            }}
            className="absolute-container offset-md-4" 
            md={4}>
            {calendar}
          </Col>  
        </Row> : null
      }

      <BigHr />

      {/** direction view */}
      <BigRow>
        <Col md={12} xs={12}>

          <div className="absolute-container d-none d-md-block">
            <Row noGutters className="h-100">
              {
                visibleSubmenu ?
                <Col className="col-md-4 bg-white h-100" style={{
                  boxShadow: "1px 0px 0px 0px black",
                  overflow: "auto"
                }}>
                  {submenu}
                </Col> : null
              }

              {
                visibleDescription ?
                <Col className="col-md-4 ml-auto h-100 bg-white" style={{
                  borderLeft: "1px solid black",
                  overflow: "auto"
                }}>
                  {description}
                </Col> : null
              } 
              
            </Row>
          </div>

          <Carousel 
            items={element.images.map(i => {
            return { src: `${imageStore.endpoint}${i}` };
          })} />
        </Col>
      </BigRow>

      <DirectionMenu 
        selectedId={props.id}
      />
    </Base>
  )
})