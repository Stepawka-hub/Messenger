import { useDispatch, useSelector } from "@store";
import { startDialogAsync } from "@thunks/dialogs";
import { Button } from "@ui/button";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { StartDialogButtonProps } from "./type";
import { MessageIcon } from "@icons";
import clsx from "clsx";
import s from "./start-dialog-button.module.css";
import { getIsStartingDialog } from '@slices/dialogs';

export const StartDialogButton: FC<StartDialogButtonProps> = ({
  userId,
  className,
  ...props
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isStartingDialog = useSelector(getIsStartingDialog);

  const startDialog = async () => {
    try {
      await dispatch(startDialogAsync(userId)).unwrap();
      navigate(`/dialogs/${userId}`);
    } catch (error) {
      console.error("Error starting dialog:", error);
    }
  };

  return (
    <Button
      aria-label="Написать сообщение"
      title="Написать сообщение"
      className={clsx(s.button, className)}
      disabled={isStartingDialog}
      onClick={startDialog}
      {...props}
    >
      <MessageIcon />
    </Button>
  );
};
