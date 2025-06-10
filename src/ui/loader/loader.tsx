import { FC } from "react";
import { LoaderProps } from "./types";
import s from "./loader.module.css";
import loaderDefault from "@images/loader.svg";

export const Loader: FC<LoaderProps> = ({
  loader = loaderDefault,
  className,
}) => (
  <div className={s.container}>
    <img src={loader} className={className || s.loader} alt="Loader" />
  </div>
);
