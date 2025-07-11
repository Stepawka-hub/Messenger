import { TPhotos } from "@types";

export type UserDetailsProps = {
  username: string;
  email: string;
  photos: TPhotos | null;
  linkPath: string;
};
