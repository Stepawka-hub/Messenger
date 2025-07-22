import { TUserId } from '@types';

export type TSetIsFollowingPayload = {
  userid: TUserId;
  followingInProgress: boolean;
};

export type TSetFollowedPayload = {
  userid: TUserId;
  status: boolean;
};
