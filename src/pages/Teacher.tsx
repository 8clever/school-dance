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
import { Col } from "reactstrap";

interface TeacherProps {
  id?: string;
}

export const Teacher = observer((props: TeacherProps) => {

  const [ teacherEditVisible, setTeacherEditVisible ] = React.useState(false);

  React.useEffect(() => {
    teacherStore.loadTeacherList({}).then(() => {
      const t = _.find(teacherStore.teacherList, _.matches({ _id: props.id }));
      const list = toJS(teacherStore.teacherList);
      teacherStore.teacher = t || list[0];
    });
  }, [props.id]);

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
              onClick={() => setTeacherEditVisible(true)}>
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
              <h2>О Педагоге</h2>
              <p>{teacher.description}</p>
            </div> : null
          }
        </BigCol>
      </BigRow>

      <TeacherEdit 
        visible={teacherEditVisible}
        toggle={() => setTeacherEditVisible(!teacherEditVisible)}
        _id={props.id}
      />

    </Base>
  )
})