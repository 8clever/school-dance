import React from "react";
import { Base, BigRow, BigButtonColMin, getShadowBoxStyle } from "../components";
import { observer } from "mobx-react-lite";
import { directionStore } from "../store/DirectionStore";
import { Col } from "reactstrap";
import { routerStore } from "../store/RouterStore";
import { CALENDAR_DAY, CalendarInner, CALENDAR_WEEK, CALENDAR_MONTH, LOCALE } from "../components/CalendarHelpers";
import { CalendarDay } from "../components/CalendarDay";
import { CalendarWeek } from "../components/CalendarWeek";
import { CalendarMonth } from "../components/CalendarMonth";
import moment from "moment";
import OutsideClickHandler from "react-outside-click-handler";
import { artistStore } from "../store/ArtistStore";
import { teacherStore } from "../store/TeacherStore";
import { performanceStore } from "../store/PerformanceStore";
import { configStore } from "../store/ConfigStore";

const calendarTypes = {
  [CALENDAR_DAY]: {
    $el: CalendarDay,
    label: "День"
  },
  [CALENDAR_WEEK]: {
    $el: CalendarWeek,
    label: "Неделя"
  },
  [CALENDAR_MONTH]: {
    $el: CalendarMonth,
    label: "Месяц"
  }
}

interface CalendarProps {
  date: string;
  type: string;
  directionId: string;
}

export const Calendar = observer((props: CalendarProps) => {
  const [ menuVisible, setMenuVisible ] = React.useState(false);
  const [ date, setDate ] = React.useState(new Date());
  const [ type, setType ] = React.useState(CALENDAR_WEEK);
  const [ isVisible, setIsVisible ] = React.useState(false);
  const [ selectedDirectionId, setSelectedDirectionId ] = React.useState(props.directionId);

  React.useEffect(() => {
    directionStore.loadItems({});
    artistStore.loadItems({});
    teacherStore.loadItems({});
    performanceStore.loadItems({});
    configStore.getConfig();
  }, []);

  React.useEffect(() => {
    setDate(props.date ? moment(props.date, "DD-MM-YYYY").toDate() : new Date());
  }, [props, props.date])

  React.useEffect(() => {
    setType(props.type || CALENDAR_WEEK)
  }, [props, props.type])

  const CalendarInner = calendarTypes[type].$el as CalendarInner;

  const list = directionStore.itemList.map(d => {
    return (
      <BigButtonColMin 
        onClick={() => {
          if (selectedDirectionId === d._id) {
            setSelectedDirectionId("");
            return;
          }

          setSelectedDirectionId(d._id as string);
        }}
        md={12}
        selected={selectedDirectionId === d._id}
        key={d._id as string}>
        {d.name} ({d.shortName})
      </BigButtonColMin>
    )
  });

  const subscribe = (
    <BigButtonColMin 
      onClick={() => {
        routerStore.push("/subscribe");
      }}
      md={12}>
      КУПИТЬ АБОНЕМЕНТ  
    </BigButtonColMin>  
  )

  return (
    <Base>
      <BigRow>
          <BigButtonColMin 
            selected={menuVisible}
            onClick={() => {
              setMenuVisible(!menuVisible)
            }}
            md={4}>
            НАПРАВЛЕНИЯ 
          </BigButtonColMin>

          {
            menuVisible ?
            <div className="d-md-none w-100">
              {list}
            </div> : null
          }
          
          <BigButtonColMin 
            style={{
              position: "relative"
            }}
            onClick={() => {
              setIsVisible(!isVisible);
            }}
            md={4}>
            {calendarTypes[type].label}
            {" "}
            ({moment(date).locale(LOCALE).format("MMMM")})
            
            <OutsideClickHandler onOutsideClick={() => {
              setIsVisible(false);
            }}>
              <div 
                className={"big-dropdown"} 
                style={{
                  display: isVisible ? "block" : "none",
                  position: "absolute",
                  left: -1,
                  right: 0,
                  top: "100%",
                  zIndex: 1000,
                  background: "#fff"
                }}>
                {
                    Object.keys(calendarTypes).map(key => {
                      if (key === type) return null;

                      return (
                        <div 
                          style={{
                            ...getShadowBoxStyle({}),
                            padding: "20px 0"
                          }}
                          onClick={() => {
                            routerStore.push(`/calendar?type=${key}&date=${moment(date).format("DD-MM-YYYY")}`)
                          }}
                          key={key}>
                          {calendarTypes[key].label}
                        </div>
                      )
                    })
                  }
              </div>
            </OutsideClickHandler>
          </BigButtonColMin>      
          <div className="col-md-4 d-none d-md-block">
            {subscribe}
          </div>      
      </BigRow>
      <BigRow>
        <Col 
          md={4} 
          className={`d-md-${menuVisible ? "block" : "none"} d-none`}>
          <BigRow>
            {list}
          </BigRow>
        </Col>
        <Col 
          style={{
            overflowY: "hidden",
            overflowX: "auto"
          }}
          md={menuVisible ? 8 : 12 }>
          <div style={{
            minWidth: (
              type === CALENDAR_DAY || 
              type === CALENDAR_MONTH ? 
              undefined : 
              850
            )
          }}>
            <CalendarInner
              selectedDirectionId={selectedDirectionId}
              date={date} 
              setDate={setDate}
            />
          </div>
        </Col>
      </BigRow>
      <div className="d-md-none">
        {subscribe}
      </div>
    </Base>
  )
})