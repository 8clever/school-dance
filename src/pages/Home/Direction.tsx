import React from "react";
import { observer } from "mobx-react-lite";
import { Base, BigRow, BigCol, BigButtonCol, Icon } from "../../components";
import { PageTitle } from "../../components/PageTitle";
import { directionStore } from "../../store/DirectionStore";
import { UncontrolledCarousel } from "reactstrap";
import { imageStore } from "../../store/ImageStore";
import { userStore } from "../../store/UserStore";
import { routerStore } from "../../store/RouterStore";
import { DirectionEventEdit } from "../../components/DirectionEventEdit";

interface DirectionProps {
  id?: string;
}

export const Direction = observer((props: DirectionProps) => {

  const [ isVisibleEditEvent, setVisibleEditEvent ] = React.useState(false);

  React.useEffect(() => {
    directionStore.loadDirection(props.id);
  }, [props.id]);

  if (!directionStore.direction) return null;
  
  return (
    <Base>
      <PageTitle>{directionStore.direction.name}</PageTitle>

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