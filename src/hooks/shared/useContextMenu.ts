import { ContextMenu } from '@providers/context-menu'
import { useContext } from 'react'

export const useContextMenu = () => {
  const context = useContext(ContextMenu);

  if (!context) {
    throw new Error("useContextMenu must be used within a ContextMenuProvider");
  }

  return context;
}