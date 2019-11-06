import React from "react";
import { Base, BigRow, BigCol, Icon, BigButtonColMin } from "../components";
import { observer } from "mobx-react-lite";
import { leaderStore } from "../store/LeaderStore";
import { userStore } from "../store/UserStore";
import _ from "lodash";
import { routerStore } from "../store/RouterStore";
import { toJS } from "mobx";
import { imageStore } from "../store/ImageStore";
import { Col, Button } from "reactstrap";
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

  const [ addVisible, setAddVisible ] = React.useState(false);
  const [ editVisible, setEditVisible ] = React.useState(false);
  const [ refresh, setRefresh ] = React.useState(0);
  const [ width, height, refCallback ] = useResizeObserver();

  React.useEffect(() => {
    leaderStore.loadLeaderList({}).then(() => {
      const t = _.find(leaderStore.leaderList, _.matches({ _id: props.id }));
      const list = toJS(leaderStore.leaderList);
      leaderStore.leader = t || list[0];
    });
  }, [props.id, refresh]);

  const element = leaderStore.leader;
  const list = leaderStore.leaderList;

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
                </BigButtonColMin>
              )
            })
          }
          {
            userStore.isAdmin() ?
            <BigButtonColMin 
              md={12} 
              onClick={() => setAddVisible(true)}>
              <Icon type="plus" /> Руководитель
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

              {
                userStore.isAdmin() ?
                <div className="text-right mb-3">
                  <Button 
                    size="sm"
                    onClick={() => {
                    setEditVisible(true)
                  }}>
                    <Icon type="pencil-alt" /> Редактировать
                  </Button>
                  <Button 
                    color="primary"
                    size="sm"
                    onClick={async () => { 
                      await leaderStore.rmLeader(element._id as string)
                      routerStore.push("/leaders");
                      setRefresh(refresh + 1);
                    }}>
                    <Icon type="trash" /> Удалить
                  </Button>
                </div> : null
              }

              <h2>О Руководителе</h2>
              <ReactMarkdown source={element.description} />
            </div> : null
          }
        </BigCol>
      </BigRow>
      
      <StudioMenu active="leaders" />

      {
        element && element._id ?
        <LeaderEdit 
          visible={editVisible}
          toggle={() => setEditVisible(!editVisible)}
          _id={element._id as string}
        /> : null
      }

      <LeaderEdit 
        visible={addVisible}
        toggle={() => setAddVisible(!addVisible)}
      />

    </Base>
  )
})