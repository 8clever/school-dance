import React from "react";
import { observer } from "mobx-react-lite";
import { Base, BigRow, BigButtonCol, Icon, BigButtonColMin, BigHr, FlexCol, getShadowBoxStyle } from "../components";
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
  }, [
    directionStore.item,
    props.sub 
  ]);

  if (!directionStore.item) return null;

  const submenu = directionStore.item.submenu.map((sub, idx) => {
    return (
      <BigButtonColMin
        key={idx}
        onClick={async () => {
          routerStore.push(`/directions/${directionStore.item.url}/${sub.url}`);
        }}
        style={{
          border: "none",
        }}
        selected={selectedSubmenuitem === idx}
        xs={12}
        md={12}>
        {sub.name}
      </BigButtonColMin>
    )
  });

  const ticketBuy = (
    <>
    </>
  )

  const description = (
    <div className="p-5">
      <MD 
        escapeHtml={false}
        source={
          selectedSubmenuitem === -1 ?
          directionStore.item.desc :
          directionStore.item.submenu[selectedSubmenuitem] &&
          directionStore.item.submenu[selectedSubmenuitem].description
        } 
      />
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

      <div 
        className="d-block d-md-none w-100" 
        style={{ borderLeft: "1px solid black" }}>
        {descriptionMobile}
      </div>

      <div 
        className="d-block d-md-none w-100" 
        style={{ borderLeft: "1px solid black" }}>
        {submenu}
      </div> 
      
      <BigHr />

      {/** direction view */}
      <BigRow style={{ position: "relative" }}>
        {
          submenu.length ?
          <Col
            md={4}
            style={getShadowBoxStyle({ top: 0 })}
            className="bg-white d-none d-md-block">
            <div 
              style={{ overflow: "auto" }}
              className="absolute-container">
              {submenu}
            </div>
          </Col> : null
        }

        <Col 
          style={getShadowBoxStyle({ top: 0 })}
          md={submenu.length ? 4 : 8} 
          xs={12}>

          <Carousel 
            ratio={submenu.length ? 1.33 : 2/3 }
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
        </Col>
        
        <Col
          md={4}
          style={getShadowBoxStyle({ top: 0 })}
          className="bg-white d-none d-md-block">
          {descriptionDesktop}
        </Col>
      </BigRow>
    </Base>
  )
})