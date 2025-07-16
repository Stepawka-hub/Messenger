import { FC, memo, useEffect, useState } from "react";
import { TimeDisplayProps } from "./type";
import { BASE_UPDATE_TIME } from "@utils/constants";
import s from "./time-display.module.css";
import clsx from "clsx";

export const TimeDisplay: FC<TimeDisplayProps> = memo(
  ({ className, interval = BASE_UPDATE_TIME, timeFn }) => {
    const [time, setTime] = useState('');

    useEffect(() => {
      setTime(timeFn());
      
      const intervalId = setInterval(() => {
        setTime(timeFn());
      }, interval);

      return () => {
        clearInterval(intervalId);
      };
    }, [interval, timeFn]);


    return <span className={clsx(s.time, className)}>{time}</span>;
  }
);
