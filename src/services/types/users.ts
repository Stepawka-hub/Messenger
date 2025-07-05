import { TUserId } from '@types';

export type TFollowUnfollowPayload = {
  userId: TUserId;
  status: boolean;
};