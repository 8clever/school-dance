import React from "react";
import { observer } from "mobx-react-lite";
import { Base, BigRow, BigButtonCol, FlexCol } from "../components";
import { PageBreadcrumbs } from "../components/PageTitle";
import { directionStore } from "../store/DirectionStore";
import { routerStore } from "../store/RouterStore";
import { DirectionSection, directionSectionMap } from "../../server/models/Direction";
import { toJS } from "mobx";
import { I18nText } from "../components/Localization";

interface CategoryProps {
  section: DirectionSection
}

export const Category = observer((props: CategoryProps) => {

  React.useEffect(() => {
    directionStore.loadItems(props).then(() => {
      if (directionStore.itemList.length === 1) {
        routerStore.history.replace(
          `/directions/${directionStore.itemList[0].url}`
        )
      }
    })
  }, []);

  const Breadcrumbs = React.useCallback(() => {
    return (
      <PageBreadcrumbs 
        items={[
          {
            title: 
              <I18nText 
                text={directionSectionMap[props.section]}
              />
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
            onClick={() => routerStore.push(`/directions/${i.url}`)}
            key={i._id as string}>
            <I18nText 
              text={i.name}
            />
          </BigButtonCol>
        )
      })}
    </BigRow>
  )

  toJS(directionStore.itemList);

  return (
    <Base>
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