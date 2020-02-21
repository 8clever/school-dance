import React from "react";
import { observer } from "mobx-react-lite";
import { Base, BigRow, BigButtonCol } from "../components";
import { PageTitle } from "../components/PageTitle";
import { directionStore } from "../store/DirectionStore";
import { routerStore } from "../store/RouterStore";
import { DirectionSection } from "../../server/models/Direction";
import { directionSectionMap } from "./Direction";

interface CategoryProps {
  section: DirectionSection
}

export const Category = observer((props: CategoryProps) => {

  React.useEffect(() => {
    directionStore.loadItems(props)
  }, []);

  return (
    <Base>
      <PageTitle>
        Главная > {directionSectionMap[props.section]}
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
                  minHeight: directionStore.itemList.length > 3 ? null : 600,
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