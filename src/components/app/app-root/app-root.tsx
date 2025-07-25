import { BackgroundDataSync } from "@components/background-data-sync";
import { ToastContainer } from "@components/toast-container";
import { ContextMenuProvider } from "@providers/context-menu";
import { ModalProvider } from "@providers/modal";
import { ThemeProvider } from "@providers/theme";
import { getInitialized } from "@slices/app";
import { useDispatch, useSelector } from "@store";
import { initializeApp } from "@thunks/app";
import { Preloader } from "@ui/preloader";
import { FC, PropsWithChildren, useEffect } from "react";
import { AppLayout } from "@components/app";

export const AppRoot: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const initialized = useSelector(getInitialized);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <ModalProvider>
        <ContextMenuProvider>
          {!initialized ? (
            <Preloader />
          ) : (
            <>
              <AppLayout>{children}</AppLayout>
              <BackgroundDataSync />
            </>
          )}
          <ToastContainer />
        </ContextMenuProvider>
      </ModalProvider>
    </ThemeProvider>
  );
};
