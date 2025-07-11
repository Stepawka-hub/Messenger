import { ReactNode } from "react";

export type ChatWrapperProps = {
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  className?: string;
};
