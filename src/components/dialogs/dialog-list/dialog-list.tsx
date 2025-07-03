import { getDialogs, getIsLoadingDialogs } from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { getDialogsAsync } from "@thunks/dialogs";
import { Dialog } from "@ui/dialog";
import { List } from "@ui/list";
import { Loader } from "@ui/loader";
import { FC, useEffect } from "react";
import s from "./dialog-list.module.css";

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
    <List className={s.list}>
      {dialogs.map((d) => (
        <Dialog key={d.id} {...d} />
      ))}
    </List>
  );
};
