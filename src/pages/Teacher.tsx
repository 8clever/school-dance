import React from "react";
import { Base, BigRow, BigCol, BigButtonCol, Icon, BigButtonColMin, FlexCol } from "../components";
import { PageTitle } from "../components/PageTitle";
import { observer } from "mobx-react-lite";
import { teacherStore } from "../store/TeacherStore";
import { userStore } from "../store/UserStore";
import _ from "lodash";
import { TeacherEdit } from "../components/TeacherEdit";
import { routerStore } from "../store/RouterStore";
import { toJS } from "mobx";
import { imageStore } from "../store/ImageStore";
import { Col, Button } from "reactstrap";
import ReactMarkdown from "react-markdown";

interface TeacherProps {
  id?: string;
}

export const Teacher = observer((props: TeacherProps) => {

  const [ teacherAddVisible, setTeacherAddVisible ] = React.useState(false);
  const [ teacherEditVisible, setTeacherEditVisible ] = React.useState(false);
  const [ refresh, setRefresh ] = React.useState(0);

  React.useEffect(() => {
    teacherStore.loadTeacherList({}).then(() => {
      const t = _.find(teacherStore.teacherList, _.matches({ _id: props.id }));
      const list = toJS(teacherStore.teacherList);
      teacherStore.teacher = t || list[0];
    });
  }, [props.id, refresh]);

  const teacher = teacherStore.teacher;

  return (
    <Base>
      <PageTitle>ПЕДАГОГИ</PageTitle>
      <BigRow>
        <Col md={4}>
          {
            teacherStore.teacherList.map(t => {
              return (
                <BigButtonColMin 
                  md={12}
                  onClick={() => {
                    routerStore.history.push(`/teacher/${t._id}`)
                  }}
                  key={t._id as string}>
                  {t.fullName}
                </BigButtonColMin>
              )
            })
          }
          {
            userStore.isAdmin() ?
            <BigButtonColMin 
              md={12} 
              onClick={() => setTeacherAddVisible(true)}>
              <Icon type="plus" /> Педагог
            </BigButtonColMin> :
            null
          }
        </Col>
        <BigCol>
          <FlexCol align="center">
            {
              teacher && teacher._id ?
              <img 
                width="100%"
                src={teacher.images.length && `${imageStore.endpoint}${teacher.images[0] as string}`} 
              /> : null
            }
          </FlexCol>
        </BigCol>
        <BigCol>
          {
            teacher && teacher._id ?
            <div style={{ padding: 30 }}>

              {
                userStore.isAdmin() ?
                <div className="text-right mb-3">
                  <Button 
                    size="sm"
                    onClick={() => {
                    setTeacherEditVisible(true)
                  }}>
                    <Icon type="pencil-alt" /> Редактировать
                  </Button>
                  <Button 
                    color="primary"
                    size="sm"
                    onClick={async () => { 
                      await teacherStore.rmTeacher(teacher._id as string)
                      routerStore.history.push("/teachers");
                      setRefresh(refresh + 1);
                    }}>
                    <Icon type="trash" /> Удалить
                  </Button>
                </div> : null
              }

              <h2>О Педагоге</h2>
              <ReactMarkdown source={teacher.description} />
            </div> : null
          }
        </BigCol>
      </BigRow>
      
      {
        teacher && teacher._id ?
        <TeacherEdit 
          visible={teacherEditVisible}
          toggle={() => setTeacherEditVisible(!teacherEditVisible)}
          _id={teacher._id as string}
        /> : null
      }

      <TeacherEdit 
        visible={teacherAddVisible}
        toggle={() => setTeacherAddVisible(!teacherAddVisible)}
      />

    </Base>
  )
})