import { useDispatch } from "@store";
import { startDialogAsync } from "@thunks/dialogs";
import { Button } from "@ui/button";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { StartDialogButtonProps } from "./type";

export const StartDialogButton: FC<StartDialogButtonProps> = ({
  userId,
  children = "Начать переписку",
  ...props
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startDialog = async () => {
    try {
      await dispatch(startDialogAsync(userId)).unwrap();
      navigate(`/dialogs/${userId}`);
    } catch (error) {
      console.error("Error starting dialog:", error);
    }
  };

  return (
    <Button {...props} onClick={startDialog}>
      {children}
    </Button>
  );
};
