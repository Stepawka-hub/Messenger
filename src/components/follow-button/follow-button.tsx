import { FC } from "react";
import { FollowIcon, UnfollowIcon } from "@icons";
import { getFollowingInProgressIds } from "@slices/users";
import { useDispatch, useSelector } from "@store";
import { followToUserAsync, unfollowFromUserAsync } from "@thunks/users";
import { IconButton } from "@ui/icon-button";
import { checkInProgress } from "@utils/helpers/array-helpers";
import { FollowButtonProps } from "./type";
import clsx from "clsx";
import s from "./follow-button.module.css";

export const FollowButton: FC<FollowButtonProps> = ({
  userId,
  followed,
  className,
  ...props
}) => {
  const dispatch = useDispatch();
  const followingInProgressIds = useSelector(getFollowingInProgressIds);
  const title = followed ? "Отписаться" : "Подписаться";

  const follow = () => {
    dispatch(followToUserAsync(userId));
  };

  const unfollow = () => {
    dispatch(unfollowFromUserAsync(userId));
  };

  return (
    <IconButton
      aria-label={title}
      title={title}
      className={className || clsx(s.button, { [s.followed]: followed })}
      disabled={checkInProgress(followingInProgressIds, userId)}
      onClick={followed ? unfollow : follow}
      {...props}
    >
      {followed ? <UnfollowIcon /> : <FollowIcon />}
    </IconButton>
  );
};
