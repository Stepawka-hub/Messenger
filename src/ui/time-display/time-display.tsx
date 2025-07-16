import { FC, memo, useEffect, useState } from "react";
import { TimeDisplayProps } from "./type";
import s from "./time-display.module.css";
import { TIME_UPDATE_INTERVAL } from "@utils/constants";

export const TimeDisplay: FC<TimeDisplayProps> = memo(
  ({ interval = TIME_UPDATE_INTERVAL, timeFn }) => {
    const [time, setTime] = useState(timeFn());

    useEffect(() => {
      const intervalId = setInterval(() => {
        console.log('update');
        setTime(timeFn());
      }, interval);

      return () => {
        clearInterval(intervalId);
      };
    }, [interval, timeFn]);

    return <span className={s.time}>{time}</span>;
  }
);
