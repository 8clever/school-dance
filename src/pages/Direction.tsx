import React from "react";
import { observer } from "mobx-react-lite";
import { Base, BigRow, BigButtonCol, Icon, BigButtonColMin, BigHr, FlexCol, getShadowBoxStyle } from "../components";
import { directionStore } from "../store/DirectionStore";
import { imageStore } from "../store/ImageStore";
import { userStore } from "../store/UserStore";
import { routerStore } from "../store/RouterStore";
import { DirectionEdit } from "../components/DirectionEdit";
import MD from "react-markdown";
import { Carousel } from "../components/Carousel";
import { Col } from "reactstrap";
import { teacherStore } from "../store/TeacherStore";
import { performanceStore } from "../store/PerformanceStore";
import { artistStore } from "../store/ArtistStore";
import _ from "lodash";
import { Direction as DirectionModel } from "../../server/models/Direction";
import { CALENDAR_MONTH } from "../components/CalendarHelpers";
import { classStore } from "../store/ClassStore";
import { HomePageEdit } from "../components/HomePageEdit";
import { configStore } from "../store/ConfigStore";

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
  },
  classes: {
    name: "КЛАССЫ",
    getItems: () => classStore.itemList.map(i => {
      return {
        _id: i._id as string,
        images: i.images as string[],
        title: i.name,
        description: i.description
      }
    }),
    loadItems: classStore.loadItems
  }
}

interface DirectionMenuItemProps {
  direction: DirectionModel;
  key?: string | number;
  onClickEdit?: () => void;
}

export const DirectionMenuItem = (props: DirectionMenuItemProps) => {
  const d = props.direction;

  return (
    <BigButtonCol
      style={{ fontFamily: "Styled Font" }}
      key={props.key}
      selected={d._id === (directionStore.item && directionStore.item._id)}           
      onClick={() => {
        routerStore.push("/directions/" + d._id)
      }}>
      <div 
        id={`item-${d._id}`} 
        style={{
          position: "absolute",
          top: 67
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

interface DirectionMenuProps {
  selectedId?: string;
  editHomePage?: boolean;
}

export const DirectionMenuTop = observer((props: DirectionMenuProps) => {
  const [ directionEditVisible, setDirectionEditVisible ] = React.useState(false);
  const [ id, setId ] = React.useState("");

  if (!props.selectedId) return null;

  const { mobile, desktop } = getMenuTop({
    ids: directionStore.itemList.map(i => i._id as string),
    selected: props.selectedId
  });

  const getItems = (ids: string[]) => {
    return ids.map((id, idx) => {
      const direction = _.find(directionStore.itemList, _.matches({ _id: id }));
      if (!direction) return;

      return DirectionMenuItem({
        direction,
        key: idx,
        onClickEdit: () => {
          setId(direction._id as string);
          setDirectionEditVisible(true);
        }
      })
    });
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

export const getMenuTop = (props: {
  selected?: string;
  ids: string[];
}) => {
  const mobile: string[] = [];
  const desktop: string[] = [];

  _.each(props.ids, (id => {
    const existsSelectedMobile = _.find(mobile, i => i === props.selected);
    const existsSelectedDesktop = _.find(desktop, i => i === props.selected);

    if (!existsSelectedMobile) {
      mobile.push(id);
    }

    if (
      !existsSelectedDesktop ||
      (existsSelectedDesktop && desktop.length % 3)) {
        desktop.push(id);
    }
  }));

  return {
    mobile,
    desktop
  }
}

export const getMenu = (props: {
  selected?: string;
  ids: string[]
}) => {
  const selectedIdx = _.findIndex(props.ids, id => id === props.selected);
  const slicedIdx = selectedIdx + 1;
  const notEnough = slicedIdx % 3;
  const notEnoughCount = 3 - notEnough;
  const slicedDesktopIdx = notEnough ? slicedIdx + notEnoughCount : slicedIdx;
  const mobile: string[] = props.ids.slice(slicedIdx);
  const desktop: string[] = props.ids.slice(slicedDesktopIdx);
  return {
    mobile,
    desktop
  }
}



export const DirectionMenu = observer((props: DirectionMenuProps) => {
  const [ directionEditVisible, setDirectionEditVisible ] = React.useState(false);
  const [ homePageEditVisible, setHomePageEditVisible ] = React.useState(false);
  const [ id, setId ] = React.useState("");

  React.useEffect(() => {
    directionStore.loadItems();
  }, []);

  const { mobile, desktop } = getMenu({
    ids:  directionStore.itemList.map(i => i._id as string),
    selected: props.selectedId
  })
  let addDirection = null;
  let editHomePage = null;

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

  if (userStore.isAdmin() && props.editHomePage) {
    editHomePage = (
      <BigButtonCol 
        style={{
          fontFamily: "Styled Font"
        }}
        onClick={() => {
          setHomePageEditVisible(true);
        }}>
        <Icon type="pencil-alt" className="mr-3" /> 
        ДОМАШНЯЯ СТРАНИЦА
      </BigButtonCol>
    )
  }

  const getItems = (ids: string[]) => {
    return ids.map((id, idx) => {
      const direction = _.find(directionStore.itemList, _.matches({ _id: id }));
      if (!direction) return;

      return DirectionMenuItem({
        direction,
        key: idx,
        onClickEdit: () => {
          setId(direction._id as string);
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
        {editHomePage}
      </div>

      <div className="d-none d-md-block">
        <BigRow 
          maxRowItems={3}>
          {getItems(desktop)}
          {addDirection}
          {editHomePage}
        </BigRow>
      </div>

      <DirectionEdit 
        _id={id}
        visible={directionEditVisible}
        toggle={() => setDirectionEditVisible(!directionEditVisible)}
      />

      <HomePageEdit 
        visible={homePageEditVisible}
        toggle={() => setHomePageEditVisible(!homePageEditVisible)}
        onSave={() => {
          configStore.getConfig();
        }}
      />
    </>
  )
})

export const Direction = observer((props: DirectionProps) => {

  const [ visibleDescription, setVisibleDescription ] = React.useState(false);
  const [ visibleSubmenu, setVisibleSubmenu ] = React.useState(false);
  const [ element, setElement ] = React.useState<Element>({ images: [], title: "", description: "" });
  const [ submenuOptions, setSubmenuOptions ] = React.useState<Element[]>([]);

  directionStore.defaults();

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

    setTimeout(() => {
      const $selectedEl = document.querySelector(`[data-spy="scroll"] #item-${props.id}`);
      const $headerEl = document.querySelector(`[data-spy="scroll"].header-anchor`);
      if ($selectedEl) {
        $selectedEl.scrollIntoView({ behavior: "smooth"});
      }
  
      if ($headerEl) {
        $headerEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
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
          setVisibleSubmenu(false);
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

  const ticketBuy = (
    directionStore.item.submenu.type === "performance" ?
    <BigRow>
      <BigButtonColMin 
        style={{
          borderLeft: "none"
        }}
        md={12}>
        КУПИТЬ БИЛЕТ
      </BigButtonColMin>
    </BigRow> : 
    null
  )

  const description = (
    <div className="p-5">
      <MD source={element.description} />
    </div>
  )

  const descriptionMobile = (
    <FlexCol justify="between" column>
      {description}
      {ticketBuy}
    </FlexCol>
  )

  const descriptionDesktop = (
    <FlexCol justify="between" column>
      <div style={{ 
        position: "relative",
        justifySelf: "stretch",
        height: "100%"
      }}>
        <div className="absolute-container" style={{ overflow: "auto" }}>
          {description}
        </div>
      </div>
      {ticketBuy}
    </FlexCol>
  )

  return (
    <Base>

      <DirectionMenuTop 
        selectedId={props.id}
      />

      <div 
        data-spy="scroll"
        className={"d-none d-md-block header-anchor"}
        style={{
          marginTop: -64,
          position: "absolute"
        }}
      />
      
      <BigRow>

        <BigButtonColMin 
          onClick={() => {
            routerStore.push(`/calendar?type=${CALENDAR_MONTH}&directionId=${props.id}`)
          }}
          md={4}>
          РАСПИСАНИЕ
        </BigButtonColMin>

        <BigButtonColMin
          selected={visibleSubmenu}
          md={4}
          onClick={() => {
            setVisibleSubmenu(!visibleSubmenu)
          }}>
          {typeMap[directionStore.item.submenu.type].name}
        </BigButtonColMin>

        <BigButtonColMin 
          selected={visibleDescription}
          md={4}
          onClick={() => {
            setVisibleDescription(!visibleDescription)
          }}
        >
          {element.title}
        </BigButtonColMin>

        {
          visibleDescription ?
          <div 
            className="d-block d-md-none w-100" 
            style={{ borderLeft: "1px solid black" }}>
            {descriptionMobile}
          </div> : null
        }

        {
          visibleSubmenu ?
          <div 
            className="d-block d-md-none w-100" 
            style={{ borderLeft: "1px solid black" }}>
            {submenu}
          </div> : null
        }

      </BigRow>
      
      <BigHr />

      {/** direction view */}
      <BigRow>
        <Col 
          style={getShadowBoxStyle({ top: 0 })}
          md={8} 
          xs={12}>

          <Carousel 
            ratio={0.5625}
            items={
              element.images.map(i => {
                return { src: `${imageStore.endpoint}${i}` };
              })
            } 
          />
        </Col>

        <Col 
          className="d-none d-md-block"
          style={getShadowBoxStyle({ top: 0 })}
          md={4}>
          {
            visibleSubmenu ?
            submenu :
            descriptionDesktop
          }
        </Col>
      </BigRow>

      <DirectionMenu 
        selectedId={props.id}
      />
    </Base>
  )
})