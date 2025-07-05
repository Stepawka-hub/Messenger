import { TSocialUser, TUserId } from "@types";

export type UserListProps = {
  users: TSocialUser[];
  currentUserId: TUserId | null;
  pageSize: number;
};
