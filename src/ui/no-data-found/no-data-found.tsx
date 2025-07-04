import { FC } from "react";
import { NoDataFoundProps } from "./type";
import s from "./no-data-found.module.css";
import clsx from 'clsx';

export const NoDataFound: FC<NoDataFoundProps> = ({
  label = "Ничего не найдено",
  className,
  children,
}) => (
  <div className={clsx(s.container, className)}>
    <p className={s.label}>{label}</p>
    {children && <div>{children}</div>}
  </div>
);
