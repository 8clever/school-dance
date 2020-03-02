import React from "react";
import { Base, BigHr, BigRow, BigButtonCol, BigEmptyRow, BigButtonColMin, BigCol } from "../components";
import { observer } from "mobx-react-lite";
import { PageTitle } from "../components/PageTitle";
import { Carousel } from "../components/Carousel";
import { configStore } from "../store/ConfigStore";
import { imageStore } from "../store/ImageStore";
import { routerStore } from "../store/RouterStore";
import _ from "lodash";
import { directionSectionMap } from "./Direction";
import { pieceOfNewsStore } from "../store/PieceOfNewsStore";
import moment from "moment";
import { PieceOfNews } from "../../server/models/PieceOfNews";

import iconLeft from "../images/icons/arrow-left.png";
import iconRight from "../images/icons/arrow-right.png";

const chevronButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  bottom: 0,
  width: 25,
  display: 'flex',
  placeItems: "center",
  justifyContent: "center",
  cursor: "pointer"
}

export const Home = observer(() => {
  const limit = 3;
  const [ skipNews, setSkipNews ] = React.useState(0);
  const [ news, setNews ] = React.useState({
    list: [] as PieceOfNews[],
    count: 0 as number
  })

  React.useEffect(() => {
    configStore.getConfig();
  }, []);

  React.useEffect(() => {
    (async () => {
      const data = await pieceOfNewsStore.getItems({}, { _dt: -1 }, limit, skipNews);
      setNews(data);
    })()
  }, [ skipNews ])

  if (!configStore.item) {
    return null;
  }

  return (
    <Base>
      <PageTitle marquee>{configStore.item.homePageTitle}</PageTitle>

      {
        configStore.item.homeCarousel.length ?
        <>
          <BigHr />
          <Carousel 
            ratio={0.31365}
            items={
            configStore.item.homeCarousel.map(_id => {
              return {
                src: `${imageStore.endpoint}/${_id}`
              }
            })
          } /> 
        </>: 
        null
      }

      <BigRow>
        {_.map(directionSectionMap, (v, k) => {
          return (
            <BigButtonCol
              key={k}
              onClick={() => routerStore.push(`/category/${k}`)}
              style={{
                minHeight: 300,
                fontFamily: "Styled Font"
              }}>
              {v}
            </BigButtonCol>
          )
        })}
      </BigRow>

      <BigEmptyRow />
      
      <BigRow>
        {
          news.list.map((i, idx) => {
            return (
              <BigButtonColMin 
                style={{
                  fontFamily: "Styled Font"
                }}
                onClick={() => routerStore.push(`/news/${i._id}`)}
                md={4}
                key={i._id as string}>

                <div 
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    padding: 5
                  }}>
                  {moment(i._dt).format("D.MM")}
                </div>

                {i.name}
                
                {
                  idx || !skipNews ? null :
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSkipNews(skipNews - 1)
                    }}
                    className="hovered"
                    style={{
                      ...chevronButtonStyle,
                      left: 0
                    }}>
                    <img width={25} src={iconLeft} />
                  </div>
                }
                
                {
                  skipNews + limit < news.count &&
                  idx + 1 === news.list.length ?
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSkipNews(skipNews + 1)
                    }}
                    className="hovered"
                    style={{
                      ...chevronButtonStyle,
                      right: 0
                    }}>
                    <img width={25} src={iconRight} />
                  </div> : null
                }
              </BigButtonColMin>
            )
          })
        } 
      </BigRow>
      
      <BigRow>
        <BigCol md={12} height={31}>&nbsp;</BigCol>
      </BigRow>
    </Base>
  )
})