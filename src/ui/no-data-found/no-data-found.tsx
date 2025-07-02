import { FC } from "react";
import { NoDataFoundProps } from "./type";
import s from "./no-data-found.module.css";

export const NoDataFound: FC<NoDataFoundProps> = ({
  label = "Ничего не найдено",
  children,
}) => (
  <div className={s.container}>
    <p className={s.label}>{label}</p>
    {children && <div>{children}</div>}
  </div>
);
