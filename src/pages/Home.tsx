import React from "react";
import { UncontrolledCarousel } from "reactstrap";
import { BigRow, Base, BigButtonCol, Icon } from "../components";
import { observer } from "mobx-react-lite";
import { userStore } from "../store/UserStore";
import { PageTitle } from "../components/PageTitle";
import { DirectionEdit } from "../components/DirectionEdit";
import { directionStore } from "../store/DirectionStore";
import { routerStore } from "../store/RouterStore";

import home1png from "../images/home/main0.png";
import home2png from "../images/home/main1.png";
import home3png from "../images/home/main2.png";

const carousel = [
  { src: home1png },
  { src: home2png },
  { src: home3png }
];

export const Home = observer(() => {
  const [ directionEditVisible, setDirectionEditVisible ] = React.useState(false);

  React.useEffect(() => {
    directionStore.loadDirections();
  }, []);

  return (
    <Base>
      <PageTitle>Направления</PageTitle>
      <UncontrolledCarousel items={carousel} />
      <BigRow>
        {
          directionStore.directions.map(d => {
            return (
              <BigButtonCol 
                key={d._id as string}                
                onClick={() => routerStore.push("/directions/" + d._id)}>
                {d.name}
              </BigButtonCol>
            )
          })
        }
        {
          userStore.isAdmin() ?
          <BigButtonCol onClick={() => setDirectionEditVisible(true)}>
            <Icon type="plus" /> ДОБАВИТЬ НАПРАВЛЕНИЕ
          </BigButtonCol> : null
        }      
      </BigRow>
      
      <DirectionEdit 
        visible={directionEditVisible}
        toggle={() => setDirectionEditVisible(!directionEditVisible)}
      />
    </Base>
  )
})