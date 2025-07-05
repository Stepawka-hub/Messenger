import { TPhotos } from "./shared.types";
import { TUser } from "./user.types";

export type TSocialUser = TUser & {
  photos: TPhotos;
  followed: boolean;
};
