import { FC, PropsWithChildren } from "react";
import { PageWrapper } from "@ui/page-wrapper";
import s from './dialogs-layout.module.css';

export const DialogsLayout: FC<PropsWithChildren> = ({ children }) => (
  <PageWrapper
    title="Диалоги"
    description="Общайтесь с друзьями и близкими в личном пространстве"
    className={s.page}
  >
    {children}
  </PageWrapper>
);
