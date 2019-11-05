import React from "react";
import { Base, BigRow, BigButtonCol } from "../components";
import { directionStore } from "../store/DirectionStore";
import { performanceStore } from "../store/PerformanceStore";
import { subscribeStore } from "../store/SubscribeStore";
import { routerStore } from "../store/RouterStore";
import { PageTitle } from "../components/PageTitle";

interface SearchProps {
  text?: string;
}

interface SearchResult {
  link: string;
  name: string;
}

export const Search = (props: SearchProps) => {
  const [ result, setResult ] = React.useState<SearchResult[]>([]);
  const searchValue = props.text || "";
  
  React.useEffect(() => {
    if (searchValue.length < 3) {
      setResult;([])
      return;
    }

    Promise.all([
      directionStore.getItems({
        $or: [
          { name: { $regex: searchValue, $options: "gmi" }},
          { desc: { $regex: searchValue, $options: "gmi" }}
        ]
      }),
      performanceStore.getItems({
        $or: [
          { name: { $regex: searchValue, $options: "gmi" }},
          { description: { $regex: searchValue, $options: "gmi" }}
        ]
      }),
      subscribeStore.getItems({
        $or: [
          { name: { $regex: searchValue, $options: "gmi" }}
        ]
      })
    ]).then(data => {
      const [ direction, performance, subscribe ] = data;
      const searchResult: SearchResult[] = [];

      direction.list.forEach(d => {
        searchResult.push({
          name: d.name,
          link: `/directions/${d._id}`
        });
      });

      performance.list.forEach(p => {
        searchResult.push({
          name: p.name,
          link: `/events/${p._id}`
        })
      });

      subscribe.list.forEach(s => {
        searchResult.push({
          name: s.name,
          link: `/subscribe/${s._id}`
        })
      });

      setResult(searchResult);
    });
  }, [searchValue])
  
  return (
    <Base>
      <PageTitle>
        {`Результаты по запросу "${searchValue}"`}
      </PageTitle>
      <BigRow>
        {
          result.map(r => {
            return (
              <BigButtonCol onClick={() => {
                routerStore.push(r.link)
              }}>
                {r.name}
              </BigButtonCol>
            )
          })
        }
      </BigRow>
    </Base>
  )
}