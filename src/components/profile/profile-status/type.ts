export type ProfileStatusProps = {
  isOwner: boolean;
  status: string;
  label: string;
  updateUserStatus: (s: string) => void;
}