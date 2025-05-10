export type TAppState = {
  initialized: boolean;
  modal: TModal;
};

export type TModal = {
  title: string;
  text: string;
  delay: number;
  isOpen: boolean;
}