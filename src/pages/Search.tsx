import React from "react";
import { Base, BigRow, BigButtonCol } from "../components";
import { directionStore } from "../store/DirectionStore";
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
      })
    ]).then(data => {
      const [ direction ] = data;
      const searchResult: SearchResult[] = [];

      direction.list.forEach(d => {
        searchResult.push({
          name: d.name,
          link: `/directions/${d._id}`
        });
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