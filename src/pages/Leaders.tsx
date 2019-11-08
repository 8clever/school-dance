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
import { useResizeObserver } from "../effects/useResizeObserver";
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
  const [ width, height, refCallback ] = useResizeObserver();

  React.useEffect(() => {
    leaderStore.loadItems({}).then(() => {
      const t = _.find(leaderStore.itemList, _.matches({ _id: props.id }));
      const list = toJS(leaderStore.itemList);
      leaderStore.item = t || list[0];
    });
  }, [props.id]);

  const element = leaderStore.item;
  const list = leaderStore.itemList;

  return (
    <Base>
      <BigRow>
        <Col 
          md={4}
          style={{ 
            minHeight: maxHeight,
            maxHeight,
            overflowY 
          }}>
          {
            list.map(el => {
              return (
                <BigButtonColMin 
                  md={12}
                  onClick={() => {
                    routerStore.push(`/leader/${el._id}`)
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
            })
          }
          {
            userStore.isAdmin() ?
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
            </BigButtonColMin> :
            null
          }
        </Col>
        <BigCol>
          <div 
            ref={refCallback}
            className="h-100" 
            style={{ 
              maxHeight,
              overflowY 
            }}>
            
            {
              element ?
              <Image 
                width={width}
                height={height}
                src={imageStore.endpoint + element.images[0] as string}
              /> : null
            } 
            
          </div>
        </BigCol>
        <BigCol>
          {
            element && element._id ?
            <div style={{ padding: 30 }}>
              <h2>О Руководителе</h2>
              <ReactMarkdown source={element.description} />
            </div> : null
          }
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