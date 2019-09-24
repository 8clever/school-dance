import React from "react";
import { Base, BigRow, BigCol, Icon, BigButtonColMin, FlexCol } from "../components";
import { PageTitle } from "../components/PageTitle";
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

interface LeaderProps {
  id?: string;
}

export const Leaders = observer((props: LeaderProps) => {

  const [ addVisible, setAddVisible ] = React.useState(false);
  const [ editVisible, setEditVisible ] = React.useState(false);
  const [ refresh, setRefresh ] = React.useState(0);

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
      <PageTitle>РУКОВОДСТВО</PageTitle>
      <BigRow>
        <Col md={4}>
          {
            list.map(el => {
              return (
                <BigButtonColMin 
                  md={12}
                  onClick={() => {
                    routerStore.history.push(`/leader/${el._id}`)
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
          <FlexCol align="center">
            {
              element && element._id ?
              <img 
                width="100%"
                src={element.images.length && `${imageStore.endpoint}${element.images[0] as string}`} 
              /> : null
            }
          </FlexCol>
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
                      routerStore.history.push("/leaders");
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