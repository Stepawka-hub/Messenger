import { PageWrapper } from "@ui/page-wrapper";
import { FC, PropsWithChildren } from "react";

export const DialogsLayout: FC<PropsWithChildren> = ({ children }) => (
  <PageWrapper
    title="Диалоги"
    description="Общайтесь с друзьями и близкими в личном пространстве"
  >
    {children}
  </PageWrapper>
);
