import { FollowIcon, UnfollowIcon } from "@icons";
import { getFollowingInProgress } from "@slices/users";
import { useDispatch, useSelector } from "@store";
import { followToUserAsync, unfollowFromUserAsync } from "@thunks/users";
import { Button } from "@ui/button";
import { checkInProgress } from "@utils/helpers/array-helpers";
import { FC } from "react";
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
  const followingInProgress = useSelector(getFollowingInProgress);

  const follow = () => {
    dispatch(followToUserAsync(userId));
  };

  const unfollow = () => {
    dispatch(unfollowFromUserAsync(userId));
  };

  return (
    <Button
      className={clsx(s.button, className, { [s.followed]: followed })}
      disabled={checkInProgress(followingInProgress, userId)}
      onClick={followed ? unfollow : follow}
      {...props}
    >
      {followed ? <UnfollowIcon /> : <FollowIcon />}
    </Button>
  );
};
