import React, { FC, ReactNode } from "react";
import { Dialog, Pane } from "evergreen-ui";

export const Popup: FC<{
  children: ReactNode;
  close: () => void;
  isOpen: boolean;
}> = ({ children, close, isOpen }) => {
  return (
    <Pane>
      <Dialog
        isShown={isOpen}
        onCloseComplete={close}
        hasFooter={false}
        hasHeader={false}
      >
        {children}
      </Dialog>
    </Pane>
  );
};
