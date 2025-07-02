import { Helmet } from "@components/helmet";
import { FC, PropsWithChildren } from "react";
import s from "./page-wrapper.module.css";
import { PageWrapperProps } from "./type";

export const PageWrapper: FC<PropsWithChildren<PageWrapperProps>> = ({
  title,
  description,
  hideTitle,
  children,
}) => {
  return (
    <>
      <Helmet title={title} description={description} />
      <section className={s.page}>
        {hideTitle }
        {children}
      </section>
    </>
  );
};
