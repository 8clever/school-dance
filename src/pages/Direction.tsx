import React from "react";
import { observer } from "mobx-react-lite";
import { Base, BigRow, BigButtonCol, Icon, BigButtonColMin, BigCol, getShadowBoxStyle } from "../components";
import { directionStore, DirectionStore } from "../store/DirectionStore";
import { imageStore } from "../store/ImageStore";
import { userStore } from "../store/UserStore";
import { routerStore } from "../store/RouterStore";
import { DirectionEdit } from "../components/DirectionEdit";
import MD from "react-markdown";
import { Carousel } from "../components/Carousel";
import { Col } from "reactstrap";
import _ from "lodash";
import { Direction as DirectionModel, directionSectionMap } from "../../server/models/Direction";
import { PageBreadcrumbs } from "../components/PageTitle";
import { executeScript } from "../components/Widget";
import { isMobile } from "../utils/isMobile";
import { useWindowResize } from "../effects/useWindowResize";

interface DirectionProps {
  id: string;
  sub?: string;
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
        routerStore.push(`/directions/${d.url}/`);
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
}
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
    </>
  )
})

export const Direction = observer((props: DirectionProps) => {

  const directionStore = React.useMemo(() => new DirectionStore(), [ props.id ]);
  const [ selectedSubmenuitem, setSelectedSubmenuItem ] = React.useState(-1);
  useWindowResize();

  React.useEffect(() => {
    (async () => {
      const items = await directionStore.getItems({
        url: props.id
      });
      if (!items.count) return;

      directionStore.item = items.list[0];
      await directionStore.loadItems({
        section: directionStore.item.section
      });
    })()
  }, [ props.id ]);

  React.useEffect(() => {
    if (!directionStore.item) return;

    const idx = directionStore.item.submenu.findIndex(s => s.url === props.sub);
    setSelectedSubmenuItem(idx);

    setTimeout(() => {
      const $el = document.querySelector(`[data-spy="scroll"] #image`);
      if (!$el) return;
      $el.scrollIntoView({ behavior: "smooth"});
    }, 100);
  }, [
    directionStore.item,
    props.sub 
  ]);

  const descriptionText = (
    directionStore.item ?
    selectedSubmenuitem === -1 ?
    directionStore.item.desc :
    directionStore.item.submenu[selectedSubmenuitem] &&
    directionStore.item.submenu[selectedSubmenuitem].description :
    ""
  )

  React.useEffect(() => {
    const scripts = descriptionText.match(/<script[^<]+<\/script>/gm);
    if (!scripts) return;
    scripts.forEach(script => {
      const src = script.match(/src="[^"]+"/);
      if (!src) return;
      const url = src[0].replace(/src=/, "").replace(/"/gm, "");
      executeScript(url);
    })
  }, [descriptionText, isMobile()])

  if (!directionStore.item) return null;

  const carousel = (
    <Carousel 
      ratio={
        directionStore.item.submenu &&
        directionStore.item.submenu.length ? 
        1.33 : 2/3 
      }
      items={
        (
          selectedSubmenuitem === -1 ?
          directionStore.item.images :
          directionStore.item.submenu[selectedSubmenuitem] &&
          directionStore.item.submenu[selectedSubmenuitem].images ||
          []
        ).map(i => {
          return { src: `${imageStore.endpoint}${i}` };
        })
      } 
    />
  )

  const description = (
    <div className="p-5">
      <MD 
        escapeHtml={false}
        source={descriptionText} 
      />
    </div>
  )

  const mobileView = (
    <>
      <div 
        style={getShadowBoxStyle({
          left: 1,
          top: 1,
          bottom: 1,
          right: 0
        })}
        className="d-md-none w-100 relative">
        <div 
          id="image" 
          style={{
            position: "absolute",
            top: -190
          }} 
        />
        {carousel}
      </div>
      <div
        style={{ borderLeft: "1px solid black" }}
        className="d-md-none w-100">
        {isMobile() && description}
      </div>
    </>
  )

  const submenu = directionStore.item.submenu.map((sub, idx) => {
    const selected = selectedSubmenuitem === idx;
    return (
      <React.Fragment key={idx}>
        <BigButtonColMin
          key={idx}
          onClick={async () => {
            routerStore.push(`/directions/${directionStore.item.url}/${sub.url}`);
          }}
          selected={selected}
          md={12}>
          {sub.name}
        </BigButtonColMin>
        {selected ? mobileView : null}
      </React.Fragment>
    )
  });

  return (
    <Base>

      <PageBreadcrumbs 
        items={[
          (
            directionStore.itemList.length > 1 ?
            {
              title: directionSectionMap[directionStore.item.section],
              url: `/category/${directionStore.item.section}`
            } : null
          ),
          {
            title: directionStore.item.name,
            url: `/directions/${directionStore.item.url}`
          },
          (
            selectedSubmenuitem === -1 ? null :
            directionStore.item.submenu[selectedSubmenuitem] &&
            {
              title: directionStore.item.submenu[selectedSubmenuitem].name,
              url: `/directions/${directionStore.item.url}/${directionStore.item.submenu[selectedSubmenuitem].url}`
            }
          )
        ]}
      />

      <BigRow>

        {/** mobile */}
        {selectedSubmenuitem === - 1 ? mobileView : null}
        <div 
          data-spy="scroll"
          className="d-md-none w-100">
          {submenu}
        </div>

        {/** desktop */}
        {
          submenu.length ?
          <Col 
            className="d-none d-md-block bg-white"
            md={4}>
            <div 
              style={{ overflow: "auto" }}
              className="absolute-container">
              {submenu}
            </div>
          </Col> : null
        }
        <BigCol 
          md={submenu.length ? 4 : 8}
          className="d-none d-md-block">
          {carousel}
        </BigCol>
        <BigCol className="d-none d-md-block">
          <div 
            style={{ overflow: "auto" }}
            className="absolute-container">
            {description}
          </div>
        </BigCol>
      </BigRow>
    </Base>
  )
})