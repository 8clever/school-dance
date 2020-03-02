import React from "react";
import { observer } from "mobx-react-lite";
import { Base, BigHr, BigRow, getShadowBoxStyle, FlexCol, BigButtonColMin, Icon } from "../components";
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

const PayBlock = (
  <BigRow>
    <BigButtonColMin 
      style={{
        borderLeft: "none"
      }}
      md={12}>
      ОПЛАТИТЬ
    </BigButtonColMin>
  </BigRow> 
)

interface NewsProps {
  pieceOfNewsId?: string;
}

export const News = observer((props: NewsProps) => {

  const [ editNews, setEditNews ] = React.useState({
    visible: false,
    _id: ""
  });

  React.useEffect(() => {
    pieceOfNewsStore.loadItems({}, { _dt: -1 });
  }, [])

  React.useEffect(() => {
    if (props.pieceOfNewsId) {
      pieceOfNewsStore.loadItem(props.pieceOfNewsId);
      return;
    }

    pieceOfNewsStore.item = null;
  }, [props.pieceOfNewsId])

  const description = (
    pieceOfNewsStore.item ?
    <div className="p-5">
      <MD source={pieceOfNewsStore.item.description} />
    </div> : null
  )
  
  const descriptionMobile = (
    <FlexCol justify="between" column>
      {description}
      {PayBlock}
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
      {PayBlock}
    </FlexCol>
  )

  const submenu = pieceOfNewsStore.itemList.map(p => {
    return (
      <BigButtonColMin
        key={p._id as string}
        onClick={async () => {
          routerStore.push(`/news/${p._id}`)
        }}
        style={{
          border: "none",
        }}
        selected={props.pieceOfNewsId === p._id}
        xs={12}
        md={12}>

        <span style={{
          marginRight: 10,
        }}>
          {moment(p._dt).format("D.MM")}
        </span>
        <span style={{
          fontWeight: 700
        }}>
          {p.name}
        </span>

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
    <Base flex>

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
      <BigRow style={{ 
        position: "relative" 
      }}>
        <Col
          md={4}
          style={getShadowBoxStyle({ top: 0 })}
          className="absolute-container bg-white d-none d-md-block">
          {submenu}
        </Col>

        {
          pieceOfNewsStore.item ?
          <>
            <Col 
              style={getShadowBoxStyle({ top: 0 })}
              md={12} 
              xs={12}>

              <Carousel 
                items={
                  pieceOfNewsStore.item.images.map(i => {
                    return { src: `${imageStore.endpoint}${i}` };
                  })
                } 
              />
            </Col>
            
            <Col
              md={4}
              style={getShadowBoxStyle({ top: 0 })}
              className="absolute-container bg-white offset-8 d-none d-md-block">
              {descriptionDesktop}
            </Col>
          </> : null
        }
        
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