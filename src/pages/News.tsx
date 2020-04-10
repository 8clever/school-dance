import React from "react";
import { observer } from "mobx-react-lite";
import { Base, BigRow, getShadowBoxStyle, BigButtonColMin, Icon, BigCol } from "../components";
import { PageBreadcrumbs } from "../components/PageTitle";
import { PieceOfNewsEdit } from "../components/PieceOfNewsEdit";
import { Col } from "reactstrap";
import { Carousel } from "../components/Carousel";
import { imageStore } from "../store/ImageStore";
import MD from "react-markdown";
import { pieceOfNewsStore } from "../store/PieceOfNewsStore";
import { routerStore } from "../store/RouterStore";
import { userStore } from "../store/UserStore";
import moment from "moment";

interface NewsProps {
  pieceOfNewsId?: string;
}

export const News = observer((props: NewsProps) => {

  const [ editNews, setEditNews ] = React.useState({
    visible: false,
    _id: ""
  });

  React.useEffect(() => {
    (async () => {
      await pieceOfNewsStore.loadItems({}, { _dt: -1 });
      if (!pieceOfNewsStore.itemList.length) return;
      if (props.pieceOfNewsId) return;
      routerStore.history.replace(`/news/${pieceOfNewsStore.itemList[0]._id}`);
    })()
  }, [props.pieceOfNewsId])

  React.useEffect(() => {
    if (props.pieceOfNewsId) {
      (async () => {
        await pieceOfNewsStore.loadItem(props.pieceOfNewsId);
        setTimeout(() => {
          const $el = document.querySelector(`[data-spy="scroll"] #image`);
          if (!$el) return;
          $el.scrollIntoView({ behavior: "smooth"});
        }, 100);
      })();
      return;
    }

    pieceOfNewsStore.item = null;
  }, [props.pieceOfNewsId])

  if (!pieceOfNewsStore.item) return null;

  const description = (
    pieceOfNewsStore.item &&
    <div className="p-5">
      <MD source={pieceOfNewsStore.item.description} />
    </div>
  )

  const carousel = (
    <Carousel 
      ratio={1.33}
      items={
        pieceOfNewsStore.item.images.map(i => {
          return { src: `${imageStore.endpoint}${i}` };
        })
      } 
    />
  )
  
  const submenu = pieceOfNewsStore.itemList.map(p => {
    const selected = props.pieceOfNewsId === p._id;
    return (
      <React.Fragment key={p._id as string}>
        <BigButtonColMin
          onClick={async () => {
            routerStore.push(`/news/${p._id}`)
          }}
          selected={selected}
          md={12}>

          <span style={{
            marginRight: 10,
          }}>
            {moment(p._dt).format("D.MM")}
          </span>
          {p.name}

          {
            userStore.isAdmin() ?
            <span className="hovered">
              <Icon 
                onClick={(e) => {
                  e.stopPropagation();
                  setEditNews({
                    visible: true,
                    _id: p._id as string
                  })
                }}
                className="ml-3"
                type="pencil-alt"
              />
              <Icon 
                onClick={async (e) => {
                  e.stopPropagation();
                  await pieceOfNewsStore.remove(p._id as string);
                  await pieceOfNewsStore.loadItems({}, { _dt: -1 });
                }}
                className="ml-3"
                type="trash"
              />
            </span> : null
          }
        </BigButtonColMin>
        {
          selected ?
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
              {description}
            </div>
          </> : null
        }
      </React.Fragment>
    )
  });

  if (userStore.isAdmin()) {
    submenu.push(
      <BigButtonColMin 
        style={{ border: "none" }}
        key="add-pieceofnews"
        md={12} 
        onClick={() => {
          setEditNews({
            visible: true,
            _id: ""
          })
        }}>
        <Icon 
          className="mr-3"
          type="plus" 
        /> 
        Новость
      </BigButtonColMin>
    )
  }

  return (
    <Base>

      <PageBreadcrumbs 
        items={[
          {
            title: "Новости"
          },
          pieceOfNewsStore.item ?
          {
            title: pieceOfNewsStore.item.name
          } : null
        ]}
      />

      <BigRow>

        {/** mobile */}
        <div 
          data-spy="scroll"
          className="d-md-none w-100">
          {submenu}
        </div>

        {/** desktop */}
        <Col 
          className="d-none d-md-block bg-white"
          md={4}>
          <div 
            style={{ overflow: "auto" }}
            className="absolute-container">
            {submenu}
          </div>
        </Col>
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

      <PieceOfNewsEdit 
        visible={editNews.visible}
        _id={editNews._id}
        toggle={() => setEditNews({ ...editNews, visible: false })}
        onSave={() => pieceOfNewsStore.loadItems({}, { _dt: -1 })}
        onCancel={() => {}}
      />
    </Base>
  )
})