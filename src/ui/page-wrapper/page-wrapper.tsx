import { Helmet } from "@components/helmet";
import { FC, PropsWithChildren } from "react";
import { PageWrapperProps } from "./type";
import clsx from "clsx";
import s from './page-wrapper.module.css';

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
