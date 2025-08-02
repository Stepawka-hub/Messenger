import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { MessageIcon } from "@icons";
import { getIsStartingDialog } from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { startDialogAsync } from "@thunks/dialogs";
import { StartDialogButtonProps } from "./type";
import { IconButton } from "@ui/icon-button";

export const StartDialogButton: FC<StartDialogButtonProps> = ({
  userId,
  className,
  children = <MessageIcon />,
  onSuccess,
  ...props
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isStartingDialog = useSelector(getIsStartingDialog);

  const startDialog = async () => {
    try {
      await dispatch(startDialogAsync(userId)).unwrap();
      onSuccess?.();
      navigate(`/dialogs/${userId}`);
    } catch (error) {
      console.error("Error starting dialog:", error);
    }
  };

  return (
    <IconButton
      aria-label="Начать диалог"
      title="Начать диалог"
      className={className}
      disabled={isStartingDialog}
      onClick={startDialog}
      {...props}
    >
      {children}
    </IconButton>
  );
};
