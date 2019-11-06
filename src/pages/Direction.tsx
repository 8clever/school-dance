import React from "react";
import { observer } from "mobx-react-lite";
import { Base, BigRow, BigCol, BigButtonCol, Icon } from "../components";
import { directionStore } from "../store/DirectionStore";
import { imageStore } from "../store/ImageStore";
import { userStore } from "../store/UserStore";
import { routerStore } from "../store/RouterStore";
import { performanceStore } from "../store/PerformanceStore";
import { HeaderCalendar } from "../components/HeaderCalendar";
import { DirectionEdit } from "../components/DirectionEdit";
import MD from "react-markdown";
import { Carousel } from "../components/Carousel";

interface DirectionProps {
  id?: string;
}

export const Direction = observer((props: DirectionProps) => {

  const [ visibleDirection, setVisibleDirection ] = React.useState(false);
  const [ date, setDate ] = React.useState(new Date());
  const [ visibleDescription, setVisibleDescription ] = React.useState(false);

  React.useEffect(() => {
    directionStore.loadItem(props.id);
    performanceStore.loadItems({
      _iddirection: props.id 
    });
  }, [props.id])

  if (!directionStore.item) return null;

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
            items={directionStore.item.images.map(i => {
            return { src: `${imageStore.endpoint}${i}` };
          })} />
        </BigCol>
        {
          visibleDescription ? (
            <BigCol md={5} xs={12}>
              <div className="p-5">
                <MD source={directionStore.item.desc} />
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
          performanceStore.itemList.map(p => {
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
            <BigButtonCol onClick={async () => {
              setVisibleDirection(true);
            }}>
              <Icon type="pencil-alt" /> Редактировать направление
            </BigButtonCol>
            <BigButtonCol onClick={async () => {
              await directionStore.remove(props.id);
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
 
    </Base>
  )
})