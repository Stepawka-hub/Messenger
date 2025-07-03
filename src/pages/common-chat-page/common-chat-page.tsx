import { getMessages } from "@slices/chat";
import { useDispatch, useSelector } from "@store";
import { startMessagesListening, stopMessagesListening } from "@thunks/chat";
import { PageWrapper } from "@ui/page-wrapper";
import { FC, useEffect } from "react";

export const CommonChatPage: FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);

  useEffect(() => {
    dispatch(startMessagesListening());

    return () => {
      dispatch(stopMessagesListening());
    };
  }, [dispatch]);

  return (
    <PageWrapper
      pageTitle="Общий чат"
      title="Общий чат"
      description="Общий чат для общения"
    >
      {/* <MessageList messages={messages} /> */}
    </PageWrapper>
  );
};
