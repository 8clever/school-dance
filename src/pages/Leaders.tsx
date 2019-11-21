import React from "react";
import { Base, BigRow, BigCol, Icon, BigButtonColMin } from "../components";
import { observer } from "mobx-react-lite";
import { leaderStore } from "../store/LeaderStore";
import { userStore } from "../store/UserStore";
import _ from "lodash";
import { routerStore } from "../store/RouterStore";
import { toJS } from "mobx";
import { imageStore } from "../store/ImageStore";
import { Col } from "reactstrap";
import ReactMarkdown from "react-markdown";
import { LeaderEdit } from "../components/LeaderEdit";
import { Image } from "../components/Carousel";
import { StudioMenu } from "./Studio";

interface LeaderProps {
  id?: string;
}

const maxHeight = 900;
const overflowY = "auto";

export const Leaders = observer((props: LeaderProps) => {

  const [ editVisible, setEditVisible ] = React.useState(false);
  const [ id, setId ] = React.useState("");

  React.useEffect(() => {
    leaderStore.loadItems({}).then(() => {
      const t = _.find(leaderStore.itemList, _.matches({ _id: props.id }));
      const list = toJS(leaderStore.itemList);
      leaderStore.item = t || list[0];
    });
  }, [props.id]);

  const element = leaderStore.item;
  const list = leaderStore.itemList;
  const imageSrc = (
    element ?
    imageStore.endpoint + element.images[0] as string :
    ""
  )

  const menuList = list.map(el => {
    return (
      <BigButtonColMin
        selected={el._id === (element && element._id)}
        md={12}
        onClick={() => {
          routerStore.push(`/leader/${el._id}`);
          const $el = document.querySelector(`[data-spy="scroll"] #image`);
          if ($el) {
            $el.scrollIntoView({ behavior: "smooth"});
          }
        }}
        key={el._id as string}>
        {el.fullName}
        {
          userStore.isAdmin() ?
          <span className="hovered">
            <Icon
              onClick={e => {
                e.stopPropagation();
                setId(el._id as string);
                setEditVisible(true)
              }}
              type="pencil-alt" 
              className="ml-3"
            />
            <Icon
              onClick={async e => {
                e.stopPropagation();
                await leaderStore.removeItemByID(el._id as string)
                await leaderStore.loadItems();
                routerStore.push("/leaders");
              }}
              type="trash" 
              className="ml-3"
            />
          </span> : null
        }
      </BigButtonColMin>
    )
  });

  if (userStore.isAdmin()) {
    menuList.push(
      <BigButtonColMin 
        md={12} 
        onClick={() => {
          setId("");
          setEditVisible(true);
        }}>
        <Icon 
          className="mr-3"
          type="plus" 
        /> 
        Руководитель
      </BigButtonColMin>
    )
  }

  const description = (
    <div style={{ padding: 30 }}>
      <h2>О Руководителе</h2>
      {
        element ?
        <ReactMarkdown source={element.description} /> :
        null
      }
    </div>
  )

  return (
    <Base>
      <BigRow>
        <div 
          className="d-md-none w-100">
          {menuList}
        </div>

        <div 
          data-spy="scroll"
          className="d-md-none w-100 relative">
          <div 
            id="image" 
            style={{
              position: "absolute",
              top: -125
            }} 
          />
          <Image 
            width="100vw"
            height="200vw"
            src={imageSrc}
          />
        </div>

        <div className="d-md-none w-100">
          {description}
        </div>

        <Col 
          className="d-none d-md-block"
          md={4}
          style={{ 
            minHeight: maxHeight,
            maxHeight,
            overflowY 
          }}>
          {menuList}
        </Col>
        <BigCol className="d-none d-md-block">
          <Image 
            width={"100%"}
            height={"100%"}
            src={imageSrc}
          />
        </BigCol>
        <BigCol className="d-none d-md-block">
          <div style={{ 
            maxHeight,
            overflowY
          }}>
            {description}
          </div>
        </BigCol>
      </BigRow>
      
      <StudioMenu active="leaders" />

      <LeaderEdit 
        _id={id}
        visible={editVisible}
        toggle={() => setEditVisible(!editVisible)}
      />

    </Base>
  )
})