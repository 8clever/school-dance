import React from "react";
import { Base, BigRow, BigButtonColMin, BigCol, Icon, FlexCol } from "../components";
import { PageTitle } from "../components/PageTitle";
import { observer } from "mobx-react-lite";
import { directionStore } from "../store/DirectionStore";
import { Col, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import { routerStore } from "../store/RouterStore";
import { CALENDAR_DAY, CalendarInner, CALENDAR_WEEK } from "../components/CalendarHelpers";
import { CalendarDay } from "../components/CalendarDay";
import { CalendarWeek } from "../components/CalendarWeek";

const calendarTypes = {
  [CALENDAR_DAY]: {
    $el: CalendarDay,
    label: "День"
  },
  [CALENDAR_WEEK]: {
    $el: CalendarWeek,
    label: "Неделя"
  }
}

export const Calendar = observer(() => {

  const [ menuVisible, setMenuVisible ] = React.useState(false);
  const [ date, setDate ] = React.useState(new Date());
  const [ type, setType ] = React.useState(CALENDAR_WEEK);
  const [ isVisible, setIsVisible ] = React.useState(false);

  React.useEffect(() => {
    directionStore.loadDirections({});
  }, []);

  const CalendarInner = calendarTypes[type].$el as CalendarInner;

  return (
    <Base>
      <PageTitle>РАСПИСАНИЕ</PageTitle>
      <BigRow>
          <BigButtonColMin 
            onClick={() => {
              setMenuVisible(!menuVisible)
            }}
            md={4}>
            НАПРАВЛЕНИЯ (ВСЕ)  
          </BigButtonColMin>      
          <BigButtonColMin 
            onClick={() => {
              setIsVisible(!isVisible);
            }}
            md={4}>
            {calendarTypes[type].label}
            <Dropdown 
              style={{  width: 0, height: 0 }}
              isOpen={isVisible} 
              toggle={() => {
                setIsVisible(false);
              }}>
              <DropdownToggle 
                style={{ 
                  padding: 0
                }} 
              />
              <DropdownMenu>
                {
                  Object.keys(calendarTypes).map(key => {
                    if (key === type) return null;

                    return (
                      <DropdownItem 
                        onClick={() => {
                          setType(key);
                        }}
                        key={key}>
                        {calendarTypes[key].label}
                      </DropdownItem>
                    )
                  })
                }
              </DropdownMenu>
            </Dropdown>
          </BigButtonColMin>      
          <BigButtonColMin 
            onClick={() => {
              routerStore.push("/subscribe");
            }}
            md={4}>
            КУПИТЬ АБОНЕМЕНТ  
          </BigButtonColMin>      
      </BigRow>
      <BigRow>
        <Col 
          md={4} 
          className={`d-${menuVisible ? "block" : "none"}`}>
          <BigRow>
            {
              directionStore.directions.map(d => {
                return (
                  <BigButtonColMin 
                    md={12}
                    key={d._id as string}>
                    {d.name} ({d.shortName})
                  </BigButtonColMin>
                )
              })
            }
          </BigRow>
        </Col>
        <Col md={menuVisible ? 8 : 12 }>
          <CalendarInner 
            date={date} 
            setDate={setDate}
          />
        </Col>
      </BigRow>
    </Base>
  )
})