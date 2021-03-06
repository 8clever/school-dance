import React from "react";
import { Base, BigRow, BigCol, Icon, BigButtonColMin, getShadowBoxStyle } from "../components";
import { observer } from "mobx-react-lite";
import { leaderStore } from "../store/LeaderStore";
import { userStore } from "../store/UserStore";
import _ from "lodash";
import { routerStore } from "../store/RouterStore";
import { imageStore } from "../store/ImageStore";
import { Col } from "reactstrap";
import ReactMarkdown from "react-markdown";
import { LeaderEdit } from "../components/LeaderEdit";
import { Carousel } from "../components/Carousel";
import { PageBreadcrumbs } from "../components/PageTitle";
import { I18nText, getI18nText } from "../components/Localization";

interface LeaderProps {
  id?: string;
}

export const Leaders = observer((props: LeaderProps) => {

  const [ editVisible, setEditVisible ] = React.useState(false);
  const [ id, setId ] = React.useState("");

  React.useEffect(() => {
    leaderStore.loadItems({}).then(() => {
      const t = _.find(leaderStore.itemList, _.matches({ url: props.id }));
      leaderStore.item = t;

      const $el = document.querySelector(`[data-spy="scroll"] #image`);
      if ($el) {
        $el.scrollIntoView({ behavior: "smooth"});
      }
    });
  }, [props.id]);

  const element = leaderStore.item;
  const list = leaderStore.itemList;
  const imageSrc = (
    element ?
    imageStore.endpoint + element.images[0] as string :
    ""
  )

  const description = (
    <div className="p-5">
      {
        element ?
        <ReactMarkdown source={getI18nText(element.description)} /> :
        null
      }
    </div>
  )

  const carousel = (
    <Carousel
      ratio={1.33}
      items={[
        {
          src: imageSrc
        }
      ]} 
    />
  )

  const menuList = list.map(el => {
    const selected = el.url === (element && element.url);

    return (
      <React.Fragment key={el._id as string}>
        <BigButtonColMin
          selected={selected}
          md={12}
          onClick={() => {
            if (selected) {
              routerStore.push(`/leaders`);
              return;
            }

            routerStore.push(`/leader/${el.url}`);
          }}>
          <I18nText text={el.fullName} />
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
        
        {/** MOBILE */}
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
          </>
          : null
        }

      </React.Fragment>
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
        <I18nText text={"Руководитель"} />
      </BigButtonColMin>
    )
  }

  return (
    <Base>

      <PageBreadcrumbs 
        items={[
          {
            title: <I18nText text="Студия" />,
            url: "/studio"
          },
          {
            title: <I18nText text="Команда" />
          },
          element ?
          {
            title: <I18nText text={element.fullName} />
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
          className="d-none d-md-block bg-white"
          md={4}>
          <div 
            style={{ overflow: "auto" }}
            className="absolute-container">
            {menuList}
          </div>
        </Col>
        <BigCol className="d-none d-md-block">
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

      <LeaderEdit 
        _id={id}
        visible={editVisible}
        toggle={() => setEditVisible(!editVisible)}
      />

    </Base>
  )
})