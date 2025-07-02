import { HelmetProps } from "@components/helmet/type";

export type PageWrapperProps = HelmetProps & {
  pageTitle?: string;
  className?: string;
};
