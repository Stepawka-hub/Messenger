import { FC, PropsWithChildren } from "react";
import { ListProps } from "./type";
import s from "./list.module.css";
import clsx from "clsx";

export const List: FC<PropsWithChildren<ListProps>> = ({
  children,
  className,
}) => <section className={clsx(s.list, className)}>{children}</section>;
