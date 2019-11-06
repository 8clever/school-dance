import React from "react";import { performanceStore } from "../store/PerformanceStore";
import { Base, BigRow, BigCol, BigButtonCol, Icon, BigButtonColMin } from "../components";
import { observer } from "mobx-react-lite";
import { imageStore } from "../store/ImageStore";
import { userStore } from "../store/UserStore";
import { routerStore } from "../store/RouterStore";
import { PerformanceEdit } from "../components/PerformanceEdit";
import { Carousel } from "../components/Carousel";
import { Row, Col } from "reactstrap";

interface PerformanceProps {
  id?: string;
}

export const Performance = observer((props: PerformanceProps) => {
 
  const [ addVisible, setAddVisible ] = React.useState(false);
  const [ editVisible, setEditVisible ] = React.useState(false);

  React.useEffect(() => {
    performanceStore.loadItems();

    if (props.id) {
      performanceStore.loadItem(props.id);
    }
  }, [props.id]);

  const images = performanceStore.item ? performanceStore.item.images : [];

  return (
    <Base>

      {/** performance view */}
      <Row noGutters>
        <Col md={3}>
          {
            performanceStore.itemList.map(i => {
              return (
                <BigButtonColMin 
                  onClick={() => {
                    routerStore.push(`/performance/${i._id}`)
                  }}
                  key={i._id as string} 
                  md={12}>
                  {i.name}
                </BigButtonColMin>
              )
            })
          }

          {
            userStore.isAdmin() ?
            <BigButtonColMin 
              onClick={() => {
                setAddVisible(true);
              }}
              md={12}>
              <Icon type="plus" />
              {" "}
              Добавить артиста
            </BigButtonColMin> : null
          }
        </Col>
        <BigCol md={9} >
          <Carousel 
            items={images.map(i => {
            return { src: `${imageStore.endpoint}${i}` };
          })} />
        </BigCol>
      </Row>
      
      {
        userStore.isAdmin() &&
        performanceStore.item &&
        performanceStore.item._id ?
        <>
          <BigRow style={{ fontFamily: "Styled Font" }}>
            <BigButtonCol onClick={() => {
              setEditVisible(true);
            }}>
              <Icon type="pencil-alt" /> Редактировать Спектакль
            </BigButtonCol>
            <BigButtonCol onClick={() => {
              performanceStore.remove(props.id);
              routerStore.push("/performance");
            }}>
              <Icon type="trash" /> Удалить Спектакль
            </BigButtonCol>
          </BigRow>

          <PerformanceEdit 
            _id={performanceStore.item._id as string}
            visible={editVisible}
            toggle={() => {
              setEditVisible(!editVisible)
            }}
            onSave={() => {
              performanceStore.loadItems();
            }}
            onCancel={() => {}}
          />
        </>
         : null
      }

      <PerformanceEdit 
        visible={addVisible}
        toggle={() => {
          setAddVisible(!addVisible)
        }}
        onSave={() => {
          performanceStore.loadItems();
        }}
        onCancel={() => {}}
      />

    </Base>
  )
})