import { Button, Dialog, Pane } from "evergreen-ui";
import React, { FC, ReactNode } from "react";

export const Popup: FC<{ children: ReactNode }> = ({ children }) => {
  const [isShown, setIsShown] = React.useState(false);

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title="Dialog title"
        onCloseComplete={() => setIsShown(false)}
        hasFooter={false}
        hasHeader={false}
      >
        {children}
      </Dialog>

      <Button onClick={() => setIsShown(true)}>Import File</Button>
    </Pane>
  );
};
