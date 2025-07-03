import { Helmet } from "@components/helmet";
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import s from "./page-wrapper.module.css";
import { PageWrapperProps } from "./type";

export const PageWrapper: FC<PropsWithChildren<PageWrapperProps>> = ({
  pageTitle,
  title,
  description,
  children,
  className,
}) => (
  <>
    <Helmet title={title} description={description} />
    <section className={clsx(s.page, className)}>
      {pageTitle && (
        <header>
          <h2 className={s.title}>{pageTitle}</h2>
        </header>
      )}
      {children}
    </section>
  </>
);
