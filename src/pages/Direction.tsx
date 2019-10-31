import React from "react";
import { observer } from "mobx-react-lite";
import { Base, BigRow, BigCol, BigButtonCol, Icon } from "../components";
import { PageTitle } from "../components/PageTitle";
import { directionStore } from "../store/DirectionStore";
import { imageStore } from "../store/ImageStore";
import { userStore } from "../store/UserStore";
import { routerStore } from "../store/RouterStore";
import { PerformanceEdit } from "../components/PerformanceEdit";
import { performanceStore } from "../store/PerformanceStore";
import { HeaderCalendar } from "../components/HeaderCalendar";
import { DirectionEdit } from "../components/DirectionEdit";
import MD from "react-markdown";
import { Carousel } from "../components/Carousel";

interface DirectionProps {
  id?: string;
}

export const Direction = observer((props: DirectionProps) => {

  const [ visiblePerformance, setVisiblePerformance ] = React.useState(false);
  const [ visibleDirection, setVisibleDirection ] = React.useState(false);
  const [ date, setDate ] = React.useState(new Date());
  const [ visibleDescription, setVisibleDescription ] = React.useState(false);

  React.useEffect(() => {
    directionStore.loadDirection(props.id);
    performanceStore.loadPerformanceList({
      _iddirection: props.id 
    });
  }, [props.id])

  if (!directionStore.direction) return null;

  return (
    <Base>
      <HeaderCalendar 
        date={date}
        onChange={setDate}
        rightButtonText="ПРОЕКТ"
        format="MM.YYYY"
        step="month"
        rightButtonOnClick={() => {
          setVisibleDescription(!visibleDescription);
        }}
      />

      {/** direction view */}
      <BigRow>
        <BigCol md={visibleDescription ? 7 : 12} xs={12}>
          <Carousel 
            items={directionStore.direction.images.map(i => {
            return { src: `${imageStore.endpoint}${i}` };
          })} />
        </BigCol>
        {
          visibleDescription ? (
            <BigCol md={5} xs={12}>
              <div className="p-5">
                <MD source={directionStore.direction.desc} />
              </div>
            </BigCol>
          ) : null
        }
      </BigRow>

      {/** performance list */}
      <BigRow 
        style={{ fontFamily: "Styled Font" }}
        maxRowItems={3}>
        {
          performanceStore.performanceList.map(p => {
            return (
              <BigButtonCol 
                onClick={() => {
                  routerStore.push(`/events/${p._id}`)
                }}
                key={p._id as string}>
                {p.name}
              </BigButtonCol>
            )
          })
        }

        {
          userStore.isAdmin() ?
          <>
            <BigButtonCol onClick={() => {
              setVisiblePerformance(true);
            }}>
              <Icon type="plus" /> Добавить Спектакль
            </BigButtonCol>
            <BigButtonCol onClick={async () => {
              setVisibleDirection(true);
            }}>
              <Icon type="pencil-alt" /> Редактировать направление
            </BigButtonCol>
            <BigButtonCol onClick={async () => {
              await directionStore.rmDirection(props.id);
              routerStore.push("/");
            }}>
              <Icon type="trash" /> Удалить направление
            </BigButtonCol>
          </>
          : null
        }

      </BigRow>

      <DirectionEdit 
        visible={visibleDirection}
        toggle={() => setVisibleDirection(!visibleDirection)}
        _id={props.id}
      />
 
      <PerformanceEdit 
        visible={visiblePerformance}
        toggle={() => setVisiblePerformance(!visiblePerformance)}
        _iddirection={props.id}
      />
    </Base>
  )
})