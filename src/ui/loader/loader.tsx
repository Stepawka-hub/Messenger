import { FC } from "react";
import { LoaderIcon } from "@icons";
import { LoaderProps } from "./types";
import clsx from "clsx";
import s from "./loader.module.css";

export const Loader: FC<LoaderProps> = ({ loader, size = 80, classes }) => {
  return (
    <div className={clsx(s.container, classes?.container)}>
      {loader || (
        <LoaderIcon size={size} className={clsx(s.loader, classes?.loader)} />
      )}
    </div>
  );
};
