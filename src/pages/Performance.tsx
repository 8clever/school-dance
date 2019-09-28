import React from "react";import { performanceStore } from "../store/PerformanceStore";
import { Base, BigRow, BigCol, BigButtonCol, Icon } from "../components";
import { PageTitle } from "../components/PageTitle";
import { HeaderCalendar } from "../components/HeaderCalendar";
import { observer } from "mobx-react-lite";
import { imageStore } from "../store/ImageStore";
import { userStore } from "../store/UserStore";
import { routerStore } from "../store/RouterStore";
import { EventEdit } from "../components/EventEdit";
import { eventStore } from "../store/EventStore";
import moment from "moment";
import { PerformanceEdit } from "../components/PerformanceEdit";
import ReactMarkdown from "react-markdown";
import { Carousel } from "../components/Carousel";

interface PerformanceProps {
  id: string;
}

export const Performance = observer((props: PerformanceProps) => {
 
  const [ date, setDate ] = React.useState(new Date());
  const [ eventEditVisible, setEventEditVisible ] = React.useState(false);
  const [ visiblePerformance, setPerformanceVisible ] = React.useState(false);

  React.useEffect(() => {
    performanceStore.loadPerformance(props.id);
  }, [props.id]);

  React.useEffect(() => {
    eventStore.loadEventList({
      _idperformance: props.id,
      dt: {
        $gte: moment(date).startOf("day").toDate()
      }
    });
  }, [props.id, date])

  if (!performanceStore.performance) return null;

  const event = eventStore.eventList.length && eventStore.eventList[0];
  
  return (
    <Base>
      <PageTitle>
        {performanceStore.performance.name}
      </PageTitle>

      <HeaderCalendar 
        date={date}
        onChange={setDate}
        rightButtonText={event ? "КУПИТЬ БИЛЕТ" : ""}
        format={"DD.MM.YYYY"}
        step="day"
      />

      {/** performance view */}
      <BigRow>
        <BigCol xs={12} md={7} lg={8} >
          <Carousel 
            items={performanceStore.performance.images.map(i => {
            return { src: `${imageStore.endpoint}${i}` };
          })} />
        </BigCol>
        <BigCol xs={12} md={5} lg={4}>
          <div style={{ padding: 30 }}>
            {
              event ?
              <p>
                {moment(event.dt).format("DD.MM.YYYY HH:mm")}
              </p> :
              null
            }
            <ReactMarkdown source={performanceStore.performance.description} />
          </div>
        </BigCol>
      </BigRow>
      
      {
        userStore.isAdmin() ?
        <BigRow>
          <BigButtonCol onClick={() => setEventEditVisible(true)}>
            <Icon type="plus" /> Событие
          </BigButtonCol>
          <BigButtonCol onClick={() => {
            setPerformanceVisible(true);
          }}>
            <Icon type="pencil-alt" /> Редактировать Спектакль
          </BigButtonCol>
          <BigButtonCol onClick={() => {
            performanceStore.rmPerformance(props.id);
            routerStore.push("/");
          }}>
            <Icon type="trash" /> Удалить Спектакль
          </BigButtonCol>
        </BigRow> : null
      }

      <PerformanceEdit 
        _id={performanceStore.performance._id as string}
        _iddirection={performanceStore.performance._iddirection as string}
        visible={visiblePerformance}
        toggle={() => {
          setPerformanceVisible(!visiblePerformance)
        }}
      />

      <EventEdit 
        _idperformance={props.id}
        visible={eventEditVisible}
        toggle={() => setEventEditVisible(!eventEditVisible)}
      />
      
    </Base>
  )
})