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

    (async () => {
      const searchCriteria = { $regex: searchValue, $options: "gmi" };
      const direction = await directionStore.getItems({
        $or: [
          { name: searchCriteria},
          { desc: searchCriteria},
          { "submenu.name": searchCriteria },
          { "submenu.description": searchCriteria }
        ]
      })
      const searchResult: SearchResult[] = [];

      const findText = (text: string) => {
        return text.toLowerCase().includes(searchValue.toLowerCase());
      }

      direction.list.forEach(d => {
        const founded = findText(d.name) || findText(d.desc);
        if (founded) {
          searchResult.push({
            name: d.name,
            link: `/directions/${d.url}`
          });
        }
        
        d.submenu.forEach(sub => {
          const founded = findText(sub.name) || findText(sub.description);
          if (!founded) return;
          searchResult.push({
            name: sub.name,
            link: `/directions/${d.url}/${sub.url}`
          });
        })
      });

      setResult(searchResult);
    })()
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