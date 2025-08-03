import {
  getDialogs,
  getDialogsPagination,
  setDialogsPage
} from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { TDialog } from "@types";
import { Button } from "@ui/button";
import { Dialog } from "@ui/dialog";
import { List } from "@ui/list";
import { Pagination } from "@ui/pagination";
import { getPaginatedItems } from "@utils/helpers";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import s from "./dialog-list.module.css";

export const DialogList: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dialogs = useSelector(getDialogs);
  const { currentPage, pageSize } = useSelector(getDialogsPagination);

  const navigateToUsers = () => {
    navigate("/users");
  };

  const setCurrentPage = (page: number) => {
    dispatch(setDialogsPage(page));
  };

  const renderDialogs = (dialog: TDialog) => (
    <Dialog key={dialog.id} {...dialog} />
  );

  const paginatedDialogs = getPaginatedItems(dialogs, currentPage, pageSize);

  return (
    <div className={s.container}>
      <List
        items={paginatedDialogs}
        renderItem={renderDialogs}
        classes={{ list: s.list, noData: s.noData }}
        emptyMessage="Список диалогов пуст"
        emptyContent={
          <Button className={s.button} onClick={navigateToUsers}>
            Найти друзей
          </Button>
        }
      />
      <Pagination
        totalCount={dialogs.length}
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
