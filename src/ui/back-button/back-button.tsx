import { Button } from "@ui/button";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { BackButtonProps } from "./type";
import s from "./back-button.module.css";
import { LeftArrowIcon } from "@icons";

export const BackButton: FC<BackButtonProps> = ({
  label = "Вернуться на главную",
  path = "/",
}) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(path);

  return (
    <Button className={s.button} onClick={handleClick}>
      <LeftArrowIcon className={s.icon} />
      {label}
    </Button>
  );
};
