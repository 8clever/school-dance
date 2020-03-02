import React from "react";
import { observer } from "mobx-react-lite";
import { Base, BigRow, BigButtonCol, FlexCol } from "../components";
import { PageBreadcrumbs } from "../components/PageTitle";
import { directionStore } from "../store/DirectionStore";
import { routerStore } from "../store/RouterStore";
import { DirectionSection } from "../../server/models/Direction";
import { directionSectionMap } from "./Direction";
import { toJS } from "mobx";

interface CategoryProps {
  section: DirectionSection
}

export const Category = observer((props: CategoryProps) => {

  React.useEffect(() => {
    directionStore.loadItems(props).then(() => {
      if (directionStore.itemList.length === 1) {
        routerStore.push(`/directions/${directionStore.itemList[0]._id}`)
      }
    })
  }, []);

  const Breadcrumbs = React.useCallback(() => {
    return (
      <PageBreadcrumbs 
        items={[
          {
            title: directionSectionMap[props.section]
          }
        ]}
      />
    )
  }, [props.section])

  const ItemList = () => (
    <BigRow className={"h-100"}>
      {directionStore.itemList.map(i => {
        return (
          <BigButtonCol
            className={`${directionStore.itemList.length > 3 ? "" : "h-100"}`}
            onClick={() => routerStore.push(`/directions/${i._id}`)}
            key={i._id as string}>
            {i.name}
          </BigButtonCol>
        )
      })}
    </BigRow>
  )

  toJS(directionStore.itemList);

  return (
    <Base flex>
      <div className="d-md-none">
        <Breadcrumbs />
        <ItemList />
      </div>
      
      <div className="d-none d-md-block absolute-container">
        <FlexCol column>
          <Breadcrumbs />
          <ItemList />
        </FlexCol>
      </div>
      
    </Base>
  )
})