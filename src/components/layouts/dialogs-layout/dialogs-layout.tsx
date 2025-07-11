import { PageWrapper } from "@ui/page-wrapper";
import { PropsWithChildren } from "react";

export const DialogsLayout = ({ children }: PropsWithChildren) => (
  <PageWrapper
    title="Диалоги"
    description="Общайтесь с друзьями и близкими в личном пространстве"
  >
    {children}
  </PageWrapper>
);
