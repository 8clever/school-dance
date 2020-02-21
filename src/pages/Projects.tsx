import React from "react";
import { observer } from "mobx-react-lite";
import { Base, BigRow, BigButtonCol } from "../components";
import { PageTitle } from "../components/PageTitle";
import { directionStore } from "../store/DirectionStore";
import { routerStore } from "../store/RouterStore";

export const Projects = observer(() => {

  React.useEffect(() => {
    directionStore.loadItems({
      section: "projects"
    })
  }, []);

  return (
    <Base>
      <PageTitle>
        Главная > Проекты
      </PageTitle>

      <div className="d-block d-md-none">
        {directionStore.itemList.map(i => {
          return (
            <BigButtonCol
              onClick={() => routerStore.push(`/directions/${i._id}`)}
              style={{
                fontFamily: "Styled Font"
              }}
              key={i._id as string}>
              {i.name}
            </BigButtonCol>
          )
        })}
      </div>
      
      <div className="d-md-block d-none">
        <BigRow>
          {directionStore.itemList.map(i => {
            return (
              <BigButtonCol
                onClick={() => routerStore.push(`/directions/${i._id}`)}
                style={{
                  minHeight: 600,
                  fontFamily: "Styled Font"
                }}
                key={i._id as string}>
                {i.name}
              </BigButtonCol>
            )
          })}
        </BigRow>
      </div>
    </Base>
  )
})