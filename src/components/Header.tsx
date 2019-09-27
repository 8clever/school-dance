import React from "react";
import { BigRow, BigCol, BigButtonColMin } from "./Big";
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
  Card,
  Popover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import { Icon } from "./Icon";
import { FlexCol } from "./Flex";
import { Login } from "./Login";
import { Notification } from "./Notification";
import { observer } from "mobx-react-lite";
import { userStore } from "../store/UserStore";
import { routerStore } from "../store/RouterStore";
import { directionStore } from "../store/DirectionStore";
import { performanceStore } from "../store/PerformanceStore";
import { subscribeStore } from "../store/SubscribeStore";

import scheduleSVG from "../images/icons/schedule.svg";

interface SearchResult {
  link: string;
  name: string;
}

export const Header = observer(() => {

  const [ isVisibleLogin, setIsVisbileLogin ] = React.useState(false);
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
          <FlexCol justify="center" align="center">
            <div onClick={() => routerStore.push("/")} style={{ cursor: "pointer" }}>
              <Logo width={100} />
            </div>
          </FlexCol>
        </BigCol>
        <BigCol className="d-none d-md-block">
          <InputGroup 
            tyle={{ marginTop: 1 }}>
            <Input
              id="input-search"
              value={searchValue}
              placeholder="Поиск..." 
              onChange={e => {
                setSearchValue(e.target.value);
              }}
            />
            <InputGroupText>
              <Icon 
                type="search" 
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
            <Button color="link">
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
            <UncontrolledButtonDropdown inNavbar>
              <DropdownToggle>
                <Icon type="bars" size={"lg"} />
              </DropdownToggle>
              <DropdownMenu style={{ padding: 0, minWidth: 400 }} right>
                <BigRow>
                  <BigButtonColMin 
                    onClick={() => routerStore.push("/")}
                    xs={12}
                    md={12}>
                    НАПРАВЛЕНИЯ
                  </BigButtonColMin>
                  <BigButtonColMin 
                    onClick={() => routerStore.push("/studio")}
                    xs={12} 
                    md={12}>
                    СТУДИЯ
                  </BigButtonColMin>
                  {
                    userStore.user ?
                    <BigButtonColMin 
                      xs={12} 
                      md={12}
                      onClick={() => { userStore.logout(); }}>
                      Выход <Icon type="sign-out-alt" />
                    </BigButtonColMin> :
                    <BigButtonColMin 
                      xs={12} 
                      md={12}
                      onClick={() => { setIsVisbileLogin(true) }}>
                      Вход <Icon type="sign-in-alt" />
                    </BigButtonColMin>
                  }

                  <BigCol md={12}>
                    <div style={{ padding: 30 }}>
                      <p>
                        Позвоните нам: +7 (812) 602-07-25
                        <br />
                        <small>
                          пн-пт 10:00 - 20:00
                        </small>
                      </p>
                      
                      <p>
                        Напишите нам: contextprostudio@gmail.com
                        <br/>
                        <small>
                          ответим в течении рабочего дня
                        </small>
                      </p>
                    </div>
                  </BigCol>
                </BigRow>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </ButtonGroup>
        </BigCol>
      </BigRow>
      <Notification />
      <Login 
        visible={isVisibleLogin}
        toggle={() => { setIsVisbileLogin(!isVisibleLogin) }} 
      />
    </div>
  )
})