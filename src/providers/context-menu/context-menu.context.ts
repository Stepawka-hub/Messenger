import { createContext } from "react";
import { TContextMenuModel } from "./types";

const initialValue: TContextMenuModel = {
  setContextMenu: () => null,
};

export const ContextMenu = createContext<TContextMenuModel>(initialValue);
