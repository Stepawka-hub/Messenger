import { getDialogs, getIsLoadingDialogs } from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { getDialogsAsync } from "@thunks/dialogs";
import { Dialog } from "@ui/dialog";
import { Loader } from "@ui/loader";
import { FC, useEffect } from "react";

export const DialogList: FC = () => {
  const dispatch = useDispatch();
  const dialogs = useSelector(getDialogs);
  const isLoading = useSelector(getIsLoadingDialogs);

  useEffect(() => {
    dispatch(getDialogsAsync());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section>
      <Dialog id="common" username="Общий чат" />
      {dialogs.map(({ id, userName }) => (
        <Dialog key={id} id={id} username={userName} />
      ))}
    </section>
  );
};
