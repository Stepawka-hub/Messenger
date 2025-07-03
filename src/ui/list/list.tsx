import { FC, PropsWithChildren } from "react";
import { ListProps } from "./type";
import s from "./list.module.css";

export const List: FC<PropsWithChildren<ListProps>> = ({
  children,
  className,
}) => <section className={className || s.list}>{children}</section>;
