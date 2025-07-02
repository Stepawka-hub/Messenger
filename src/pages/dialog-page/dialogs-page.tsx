import { DialogList } from "@components/chat";
import { PageWrapper } from "@ui/page-wrapper";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";

const DialogsPage: FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { userId } = useParams<{ userId?: string }>();
  const isPublicChat = userId === "common";

  return (
    <PageWrapper
      title="Сообщения"
      description="Общайтесь с друзьями и близкими в личном пространств"
    >
      <DialogList />
      {isPublicChat ? <div>Common chat</div> : <div>Private chat</div>}
    </PageWrapper>
  );
};

export default DialogsPage;
