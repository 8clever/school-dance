import React from "react";
import { Base, BigRow, BigCol, Icon, BigButtonColMin } from "../components";
import { observer } from "mobx-react-lite";
import { teacherStore } from "../store/TeacherStore";
import { userStore } from "../store/UserStore";
import _ from "lodash";
import { TeacherEdit } from "../components/TeacherEdit";
import { routerStore } from "../store/RouterStore";
import { toJS } from "mobx";
import { imageStore } from "../store/ImageStore";
import { Col } from "reactstrap";
import ReactMarkdown from "react-markdown";
import { useResizeObserver } from "../effects/useResizeObserver";
import { Image } from "../components/Carousel";
import { StudioMenu } from "./Studio";

interface TeacherProps {
  id?: string;
}

const maxHeight = 900;
const overflowY = "auto";

export const Teacher = observer((props: TeacherProps) => {

  const [ teacherEditVisible, setTeacherEditVisible ] = React.useState(false);
  const [ id, setId ] = React.useState("");
  const [ width, height, refCallback ] = useResizeObserver();

  React.useEffect(() => {
    teacherStore.loadItems({}).then(() => {
      const list = toJS(teacherStore.itemList);
      const t = _.find(list, _.matches({ _id: props.id }));
      teacherStore.item = t || list[0];
    });
  }, [props.id]);

  const { item: teacher, itemList } = teacherStore;

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
            itemList.map(t => {
              return (
                <BigButtonColMin 
                  md={12}
                  onClick={() => {
                    routerStore.push(`/teacher/${t._id}`)
                  }}
                  key={t._id as string}>
                  {t.fullName}

                  {
                    userStore.isAdmin() ?
                    <span className="hovered">
                      <Icon 
                        onClick={(e) => {
                          e.stopPropagation();
                          setId(t._id as string);
                          setTeacherEditVisible(true)
                        }}
                        className="ml-3"
                        type="pencil-alt"
                      />
                      <Icon 
                        onClick={async (e) => {
                          e.stopPropagation();
                          await teacherStore.removeItemByID(t._id as string)
                          await teacherStore.loadItems();
                          routerStore.push("/teachers");
                        }}
                        className="ml-3"
                        type="trash"
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
                setTeacherEditVisible(true);
              }}>
              <Icon 
                className="mr-3"
                type="plus" 
              /> 
              Педагог
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
              teacher ?
              <Image 
                width={width}
                height={height}
                src={imageStore.endpoint + teacher.images[0] as string}
              /> : null
            }
            
          </div>
        </BigCol>
        <BigCol>
          {
            teacher && teacher._id ?
            <div style={{ padding: 30 }}>
              <h2>О Педагоге</h2>
              <ReactMarkdown source={teacher.description} />
            </div> : null
          }
        </BigCol>
      </BigRow>

      <StudioMenu active="teachers" />
      
      <TeacherEdit 
        _id={id}
        visible={teacherEditVisible}
        toggle={() => setTeacherEditVisible(!teacherEditVisible)}
      />

    </Base>
  )
})