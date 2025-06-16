export type ProfileStatusProps = {
  isOwner: boolean;
  status: string;
  updateUserStatus: (s: string) => void;
}