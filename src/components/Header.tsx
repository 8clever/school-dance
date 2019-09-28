import React from "react";
import { BigRow, BigCol } from "./Big";
import { Logo } from "./Logo";
import { 
  Input, 
  ButtonGroup, 
  Button, 
  InputGroup, 
  InputGroupText, 
  DropdownToggle, 
  DropdownMenu, 
  UncontrolledButtonDropdown, 
  Popover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import { Icon } from "./Icon";
import { FlexCol } from "./Flex";
import { Notification } from "./Notification";
import { observer } from "mobx-react-lite";
import { routerStore } from "../store/RouterStore";
import { directionStore } from "../store/DirectionStore";
import { performanceStore } from "../store/PerformanceStore";
import { subscribeStore } from "../store/SubscribeStore";

import scheduleSVG from "../images/icons/schedule.svg";
import zalupaSVG from "../images/icons/zalupa.svg";
import { HeaderMenu } from "./HeaderMenu";
import { menuStore } from "../store/MenuStore";

interface SearchResult {
  link: string;
  name: string;
}

export const Header = observer(() => {

  const [ resultVisible, setResultVisible ] = React.useState(false);
  const [ result, setResult ] = React.useState<SearchResult[]>([]);
  const [ searchValue, setSearchValue ] = React.useState("");

  React.useEffect(() => {
    if (searchValue.length < 3) {
      setResult([])
      setResultVisible(false);
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
      setResultVisible(true);
    });
  }, [searchValue])

  return (
    <div className="sticky-top bg-white">
      <BigRow>
        <BigCol className="d-none d-md-block">
          <FlexCol justify="start" align="center">
            <div 
              onClick={() => routerStore.push("/")} 
              style={{ 
                padding: "0px 10px",
                cursor: "pointer" 
              }}>
              <Logo width={100} />
            </div>
          </FlexCol>
        </BigCol>
        <BigCol className="d-none d-md-block">
          <InputGroup 
            tyle={{ marginTop: 1 }}>
            <Input
              className="bg-white"
              id="input-search"
              value={searchValue}
              onChange={e => {
                setSearchValue(e.target.value);
              }}
            />
            <InputGroupText>
              <img 
                height={15}
                width={15}
                src={zalupaSVG} 
              />
            </InputGroupText>
          </InputGroup>
          <Popover 
            hideArrow
            placement="bottom-start" 
            isOpen={resultVisible} 
            target="input-search" 
            trigger="legacy"
            toggle={() => setResultVisible(!resultVisible)}>
            <PopoverHeader style={{ padding: 20 }}>
              Результат поиска
            </PopoverHeader>
            <PopoverBody style={{ padding: 20 }}>
              {
                result.length ? 
                <>
                  {
                    result.map((r, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <a 
                            href="" 
                            onClick={(e) => {
                              e.preventDefault();
                              routerStore.push(r.link)
                            }}>
                            {r.name}
                          </a><br/>
                        </React.Fragment>
                      )
                    })
                  }
                </> : "Ничего не найдено"
              }
            </PopoverBody>
          </Popover>
        </BigCol>
        <BigCol className="text-right">
          <ButtonGroup>
            <Button 
              style={{
                fontFamily: "Roboto"
              }}
              color="link">
              РУ
            </Button>
            <Button 
              onClick={() => {
                routerStore.push("/calendar")
              }}
              color="link">
              <img 
                style={{
                  width: 23
                }}
                src={scheduleSVG} 
              />
            </Button>
            <Button 
              color="link"
              onClick={menuStore.toggle}>
              <Icon type="bars" size={"lg"} />
            </Button>
          </ButtonGroup>
        </BigCol>
      </BigRow>
      <Notification />
    </div>
  )
})