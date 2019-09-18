import React from "react";
import { observer } from "mobx-react-lite";
import { Base, BigRow, BigCol, BigButtonCol, Icon, FlexCol } from "../../components";
import { PageTitle } from "../../components/PageTitle";
import { directionStore } from "../../store/DirectionStore";
import { UncontrolledCarousel, ButtonGroup, Row, Col } from "reactstrap";
import { imageStore } from "../../store/ImageStore";
import { userStore } from "../../store/UserStore";
import { routerStore } from "../../store/RouterStore";
import { DirectionEventEdit } from "../../components/DirectionEventEdit";
import { directionEventStore } from "../../store/DirectionEventStore";
import moment from "moment";

interface DirectionProps {
  id?: string;
}

export const Direction = observer((props: DirectionProps) => {

  const [ isVisibleEditEvent, setVisibleEditEvent ] = React.useState(false);
  const [ date, setDate ] = React.useState(new Date());

  React.useEffect(() => {
    directionStore.loadDirection(props.id);
  }, [props.id])

  React.useEffect(() => {
    directionEventStore.loadDirectionEvents({ 
      dt: { 
        $gte: moment(date).startOf("month").toDate(),
        $lte: moment(date).endOf("month").toDate() 
      },
      _iddirection: props.id 
    });
  }, [props.id, date]);

  if (!directionStore.direction) return null;

  return (
    <Base>
      <PageTitle>{directionStore.direction.name}</PageTitle>

      {/** calendar */}
      <BigRow>
        <BigButtonCol 
          className="d-none d-md-block" 
          padding={"15px 0"} 
        />
        <BigCol >
          <FlexCol align="center" justify="between">
            <div 
              style={{ 
                padding: 10,
                cursor: "pointer" 
              }} 
              onClick={() => {
              setDate(moment(date).add(-1, "month").toDate())
            }}>
              <Icon type="chevron-left" />
            </div>
            <div style={{ padding: 10 }}>
              {moment(date).format("MM.YYYY")}
            </div>
            <div 
              style={{ 
                padding: 10,
                cursor: "pointer" 
              }}
              onClick={() => {
              setDate(moment(date).add(1, "month").toDate())
            }}>
              <Icon type="chevron-right" />
            </div>
          </FlexCol>
        </BigCol>
        <BigButtonCol 
          className="d-none d-md-block" 
          padding={"15px 0"} 
        />
      </BigRow>
      
      {/** event view */}
      <BigRow>
        <BigCol md={7} lg={8} xs={12}>
          <UncontrolledCarousel 
            items={directionStore.direction.images.map(i => {
            return { src: `${imageStore.endpoint}${i}` };
          })} />
        </BigCol>
        <BigCol md={5} lg={4} xs={12}>
            
        </BigCol>
      </BigRow>

      {/** additional events */}
      <BigRow>

        {
          userStore.isAdmin() ?
          <>
            <BigButtonCol onClick={() => {
              setVisibleEditEvent(true);
            }}>
              <Icon type="plus" /> Добавить событие
            </BigButtonCol>
            <BigButtonCol onClick={async () => {
              await directionStore.rmDirection(props.id);
              routerStore.history.push("/");
            }}>
              <Icon type="trash" /> Удалить направление
            </BigButtonCol>
          </>
          : null
        }

      </BigRow>
 
      <DirectionEventEdit 
        visible={isVisibleEditEvent}
        toggle={() => setVisibleEditEvent(!isVisibleEditEvent)}
        _iddirection={props.id}
      />
    </Base>
  )
})