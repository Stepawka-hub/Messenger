import { FC } from "react";
import { CounterProps } from "./type";
import clsx from "clsx";
import s from "./counter.module.css";

export const Counter: FC<CounterProps> = ({
  count,
  limit = 99,
  className,
}) => (
  <div className={clsx(s.counter, className)}>
    <p className={s.count}> {limit && count > limit ? `${limit}+` : count}</p>
  </div>
);
