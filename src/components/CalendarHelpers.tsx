import moment from "moment";
import { parseExpression } from "cron-parser";
import { Direction } from "../../server/models/Direction";
import _ from "lodash";
import { toJS } from "mobx";
import { Event } from "../../server/models/Event";
import { Performance } from "../../server/models/Performance";

export const LOCALE = "ru";

export const CALENDAR_DAY = "calendar_day";
export const CALENDAR_WEEK = "calendar_week";
export const CALENDAR_MONTH = "calendar_month";

export interface CalendarInnerProps {
  date: Date;
  setDate: (date: Date) => void;
  selectedDirectionId?: string;
}

export type CalendarInner = (props: CalendarInnerProps) => JSX.Element;

export const findSchedulesByTime = (
  time: moment.Moment, 
  directions: Direction[],
) => {
  const schedules: {[key: string]: Direction} = {};
  directions.forEach(i => {
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

export const findEventsByTime = (
  time: moment.Moment, 
  events: Event[],
  performance: Performance[]
) => {
  const ev: Performance[] = [];
  const end = time.clone().add(1, "hour");
  _.each(events, e => {
    if (!(time.isSame(e.dt) || moment(e.dt).isBetween(time, end))) return;
    const perf = _.find(performance, _.matches({ _id: e._idperformance }));
    if (!perf) return;
    ev.push(perf);
  });
  return ev;
}

interface Time {
  time: moment.Moment
}

export const getTimes = (date: Date) => {
  let times: Time[] = new Array(24);
  times.fill(null);

  times = times.map((t, idx) => {
    return {
      time: moment(date).startOf("day").add(idx, "hour")
    }
  });
  return times;
}

export interface WeekDayItem {
  day: moment.Moment;
}

export const getWeekDays = (start: Date) => {
  const days: WeekDayItem[] = new Array(7);
  days.fill(null);

  days.forEach((v, k) => {
    days[k] = {
      day: moment(start).add(k, "day").startOf("day")
    }
  });

  return days;
}