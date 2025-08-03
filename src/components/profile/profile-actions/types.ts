import { WithOwnerProps, WithProfileProps } from "@components/profile";
import { TUserId } from "@types";

export type ProfileActionsProps = WithOwnerProps &
  WithProfileProps & {
    userId: TUserId;
  };
