import React from "react";
import { observer } from "mobx-react-lite";
import { Base, BigRow, BigCol, BigButtonCol, Icon } from "../components";
import { PageTitle } from "../components/PageTitle";
import { directionStore } from "../store/DirectionStore";
import { UncontrolledCarousel } from "reactstrap";
import { imageStore } from "../store/ImageStore";
import { userStore } from "../store/UserStore";
import { routerStore } from "../store/RouterStore";
import { PerformanceEdit } from "../components/PerformanceEdit";
import { performanceStore } from "../store/PerformanceStore";
import { HeaderCalendar } from "../components/HeaderCalendar";
import { DirectionEdit } from "../components/DirectionEdit";

interface DirectionProps {
  id?: string;
}

export const Direction = observer((props: DirectionProps) => {

  const [ visiblePerformance, setVisiblePerformance ] = React.useState(false);
  const [ visibleDirection, setVisibleDirection ] = React.useState(false);
  const [ date, setDate ] = React.useState(new Date());

  React.useEffect(() => {
    directionStore.loadDirection(props.id);
    performanceStore.loadPerformanceList({
      _iddirection: props.id 
    });
  }, [props.id])

  if (!directionStore.direction) return null;

  return (
    <Base>
      <PageTitle>{directionStore.direction.name}</PageTitle>

      <HeaderCalendar 
        date={date}
        onChange={setDate}
        rightButtonText="ПРОЕКТ"
        format="MM.YYYY"
        step="month"
      />

      {/** direction view */}
      <BigRow>
        <BigCol md={12} xs={12}>
          <UncontrolledCarousel 
            items={directionStore.direction.images.map(i => {
            return { src: `${imageStore.endpoint}${i}` };
          })} />
        </BigCol>
      </BigRow>

      {/** performance list */}
      <BigRow>

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