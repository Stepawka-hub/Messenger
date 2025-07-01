import { getDialogs } from "@slices/chat";
import { useSelector } from "@store";
import { Dialog } from "@ui/dialog";
import { FC } from "react";

export const DialogList: FC = () => {
  const dialogs = useSelector(getDialogs);

  return (
    <section>
      {dialogs.map(({ id, username }) => (
        <Dialog key={id} id={id} username={username} />
      ))}
    </section>
  );
};
