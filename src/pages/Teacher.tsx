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
import { Image } from "../components/Carousel";
import { PageBreadcrumbs } from "../components/PageTitle";

interface TeacherProps {
  id?: string;
}

const maxHeight = 900;
const overflowY = "auto";

export const Teacher = observer((props: TeacherProps) => {

  const [ teacherEditVisible, setTeacherEditVisible ] = React.useState(false);
  const [ id, setId ] = React.useState("");

  React.useEffect(() => {
    teacherStore.loadItems({}, { fullName: 1 }).then(() => {
      const list = toJS(teacherStore.itemList);
      const t = _.find(list, _.matches({ _id: props.id }));
      teacherStore.item = t;

      const $el = document.querySelector(`[data-spy="scroll"] #image`);
      if ($el) {
        $el.scrollIntoView({ behavior: "smooth"});
      }
    });
  }, [props.id]);

  const { item: teacher, itemList } = teacherStore;

  const description = (
    <div style={{ padding: 30 }}>
      <h2>О Педагоге</h2>
      {
        teacher ?
        <ReactMarkdown source={teacher.description} /> :
        null
      }
    </div>
  );

  const imageSrc = (
    teacher ?
    imageStore.endpoint + teacher.images[0] as string :
    ""
  )

  const menuList = itemList.map(t => {
    const selected = t._id === (teacher && teacher._id);

    return (
      <React.Fragment key={t._id as string}>
        <BigButtonColMin
          selected={selected} 
          md={12}
          onClick={() => {
            if (selected) {
              routerStore.push("/teachers");
              return;
            }

            routerStore.push(`/teacher/${t._id}`);
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
        
        {
          selected ?
          <>
            <div 
              style={{
                border: "1px solid black"
              }}
              className="d-md-none w-100 relative">
              <div 
                id="image" 
                style={{
                  position: "absolute",
                  top: -190
                }} 
              />
              <Image 
                width="100vw"
                height="200vw"
                src={imageSrc}
              />
            </div>

            <div 
              style={{
                borderLeft: "1px solid black"
              }}
              className="d-md-none w-100">
              {description}
            </div>
          </> : null
        }
        
      </React.Fragment>
    )
  });

  if (userStore.isAdmin()) {
    menuList.push(
      <BigButtonColMin 
        key="add-teacher"
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
      </BigButtonColMin>
    )
  }

  return (
    <Base>

      <PageBreadcrumbs
        items={[
          {
            title: "Cтудия",
            url: "/studio"
          },
          {
            title: "Педагоги"
          },
          teacher ?
          {
            title: teacher.fullName
          } : null
        ]}
      />

      <BigRow>

        {/** mobile */}
        <div 
          data-spy="scroll"
          className="d-md-none w-100">
          {menuList}
        </div>
        
        {/** desktop */}
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
        <BigCol
          className="d-none d-md-block">
          <Image 
            width={"100%"}
            height={"100%"}
            src={imageSrc}
          />
        </BigCol>
        <BigCol
          className="d-none d-md-block">
          <div style={{ 
            maxHeight,
            overflowY 
          }}>
            {description}
          </div>
        </BigCol>
      </BigRow>
      
      <TeacherEdit 
        _id={id}
        visible={teacherEditVisible}
        toggle={() => setTeacherEditVisible(!teacherEditVisible)}
      />

    </Base>
  )
})