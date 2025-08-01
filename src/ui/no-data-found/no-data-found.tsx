import { FC } from "react";
import { NoDataFoundProps } from "./type";
import s from "./no-data-found.module.css";
import clsx from "clsx";

export const NoDataFound: FC<NoDataFoundProps> = ({
  label = "Ничего не найдено",
  classes,
  children,
}) => (
  <div className={clsx(s.container, classes?.container)}>
    <p className={clsx(s.label, classes?.label)}>{label}</p>
    {children && <div>{children}</div>}
  </div>
);
