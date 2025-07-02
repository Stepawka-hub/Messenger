export type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type TNavItems = {
  to: string;
  label: string;
  hide?: boolean;
};
