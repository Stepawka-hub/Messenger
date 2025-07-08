import { LoaderIcon } from "@icons";
import clsx from "clsx";
import { FC } from "react";
import s from "./loader.module.css";
import { LoaderProps } from "./types";

export const Loader: FC<LoaderProps> = ({ loader, size = 96, classes }) => (
  <div className={clsx(s.container, classes?.container)}>
    {loader || (
      <LoaderIcon size={size} className={clsx(s.loader, classes?.loader)} />
    )}
  </div>
);
