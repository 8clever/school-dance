import React from "react";import { performanceStore } from "../store/PerformanceStore";
import { Base, BigRow, BigCol, BigButtonCol, Icon } from "../components";
import { PageTitle } from "../components/PageTitle";
import { HeaderCalendar } from "../components/HeaderCalendar";
import { observer } from "mobx-react-lite";
import { UncontrolledCarousel } from "reactstrap";
import { imageStore } from "../store/ImageStore";
import { userStore } from "../store/UserStore";
import { routerStore } from "../store/RouterStore";
import { EventEdit } from "../components/EventEdit";
import { eventStore } from "../store/EventStore";
import moment from "moment";

interface PerformanceProps {
  id: string;
}

export const Performance = observer((props: PerformanceProps) => {
 
  const [ date, setDate ] = React.useState(new Date());
  const [ eventEditVisible, setEventEditVisible ] = React.useState(false);

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
          <UncontrolledCarousel 
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
            <h2>{performanceStore.performance.name}</h2>
            <p>{performanceStore.performance.description}</p>
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
            performanceStore.rmPerformance(props.id);
            routerStore.history.push("/");
          }}>
            <Icon type="trash" /> Удалить Спектакль
          </BigButtonCol>
        </BigRow> : null
      }

      <EventEdit 
        _idperformance={props.id}
        visible={eventEditVisible}
        toggle={() => setEventEditVisible(!eventEditVisible)}
      />
      
    </Base>
  )
})