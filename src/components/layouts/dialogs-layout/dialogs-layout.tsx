import { PageWrapper } from "@ui/page-wrapper";
import { PropsWithChildren } from "react";

export const DialogsLayout = ({ children }: PropsWithChildren) => (
  <PageWrapper
    pageTitle="Диалоги"
    title="Сообщения"
    description="Общайтесь с друзьями и близкими в личном пространстве"
  >
    {children}
  </PageWrapper>
);
