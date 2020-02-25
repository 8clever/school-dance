import React from "react";
import { observer } from "mobx-react-lite";
import { Base, BigRow, BigButtonCol } from "../components";
import { PageBreadcrumbs } from "../components/PageTitle";
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
      <PageBreadcrumbs 
        items={[
          {
            title: directionSectionMap[props.section]
          }
        ]}
      />

      <BigRow>
        {directionStore.itemList.map(i => {
          return (
            <BigButtonCol
              className={`${directionStore.itemList.length > 3 ? "" : "d-h-600"}`}
              onClick={() => routerStore.push(`/directions/${i._id}`)}
              style={{
                fontFamily: "Styled Font"
              }}
              key={i._id as string}>
              {i.name}
            </BigButtonCol>
          )
        })}
      </BigRow>
    </Base>
  )
})