import { getDialogs, getIsLoadingDialogs } from "@slices/dialogs";
import { useSelector } from "@store";
import { TDialog } from "@types";
import { Dialog } from "@ui/dialog";
import { List } from "@ui/list";
import { Loader } from "@ui/loader";
import { FC } from "react";
import s from './dialog-list.module.css';

export const DialogList: FC = () => {
  const dialogs = useSelector(getDialogs);
  const isLoading = useSelector(getIsLoadingDialogs);

  if (isLoading) {
    return <Loader />;
  }

  const renderDialogs = (dialog: TDialog) => (
    <Dialog key={dialog.id} {...dialog} />
  );

  return (
    <List
      items={dialogs}
      renderItem={renderDialogs}
      isLoading={isLoading}
      classes={{ list: s.list, noData: s.noData }}
      emptyMessage="Список диалогов пуст"
    />
  );
};
