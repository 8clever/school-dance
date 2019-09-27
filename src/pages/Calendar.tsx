import React from "react";
import { Base, BigRow, BigButtonColMin, BigCol, Icon, FlexCol } from "../components";
import { PageTitle } from "../components/PageTitle";
import { observer } from "mobx-react-lite";
import { directionStore } from "../store/DirectionStore";
import { Col } from "reactstrap";
import moment from "moment";
import { routerStore } from "../store/RouterStore";
import _ from "lodash";
import { parseExpression } from "cron-parser";
import { Direction } from "../../server/models/Direction";
import { toJS } from "mobx";

const LOCALE = "ru";

interface Time {
  time: moment.Moment
}

export const Calendar = observer(() => {

  const [ menuVisible, setMenuVisible ] = React.useState(false);
  const [ date, setDate ] = React.useState(new Date());

  React.useEffect(() => {
    directionStore.loadDirections({});
  }, []);

  // looks like as fukn shit
  let times: Time[] = new Array(24);
  times.fill(undefined);

  times = times.map((t, idx) => {
    return {
      time: moment(date).startOf("day").add(idx, "hour")
    }
  });

  const findSchedulesByTime = (time: moment.Moment) => {
    const items = directionStore.directions;
    const schedules: {[key: string]: Direction} = {};
    items.forEach(i => {
      _.each(i.schedule, s => {
        const interval = parseExpression(s, {
          startDate: time.clone().toDate(),
          currentDate: time.clone().add(1).toDate()
        });

        if (interval.hasPrev()) {
          schedules[i._id as string] = toJS(i);
        }
      });
    });
    return _.values(schedules);
  }

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
          <BigButtonColMin md={4}>
            ДЕНЬ 
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
                    {d.name}
                  </BigButtonColMin>
                )
              })
            }
          </BigRow>
        </Col>
        <Col md={menuVisible ? 8 : 12 }>
          <BigRow>
            <BigButtonColMin 
              onClick={() => {
                const prev = moment(date).add(-1, "day").toDate();
                setDate(prev);
              }}
              bottom={0}
              md={1}>
              <Icon type="chevron-left" />
            </BigButtonColMin>
            <BigButtonColMin md={10}>
              {moment(date).locale(LOCALE).format("ddd")}
              {" "}
              {moment(date).locale(LOCALE).format("DD")}
            </BigButtonColMin>
            <BigButtonColMin 
              onClick={() => {
                const next = moment(date).add(1, "day").toDate();
                setDate(next);
              }}
              bottom={0}
              md={1}>
              <Icon type="chevron-right" />
            </BigButtonColMin>
            {
              times.map((t, idx) => {
                if (!(idx > 6 && idx < 23)) return null;

                const schedules = findSchedulesByTime(t.time);

                return (
                  <React.Fragment key={idx}>
                    <BigButtonColMin
                      top={0}
                      bottom={0}
                      md={1}>
                      {t.time.format("HH:mm")}
                    </BigButtonColMin>
                    <BigCol md={10}>
                      <FlexCol>
                        {
                          schedules.map((s, idx) => {
                            return (
                              <div 
                                key={idx}
                                className="text-center"
                                style={{
                                  padding: 20,
                                  width: "100%",
                                  backgroundColor: idx % 2 ? "#f0f3f7" : undefined
                                }}>
                                {s.name}
                              </div>
                            )
                          })
                        }
                      </FlexCol>
                    </BigCol>
                    <BigButtonColMin 
                      top={0}
                      bottom={0}
                      md={1}>
                      &nbsp;
                    </BigButtonColMin>
                  </React.Fragment>
                )
              })
            }
          </BigRow>
        </Col>
      </BigRow>
    </Base>
  )
})