import moment from "moment";
import { parseExpression } from "cron-parser";
import { Direction } from "../../server/models/Direction";
import _ from "lodash";
import { toJS } from "mobx";

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
      if (!_.isPlainObject(s)) return;

      const interval = parseExpression(s.cron, {
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