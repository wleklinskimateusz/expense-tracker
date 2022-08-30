import React, { FC, ReactNode } from "react";

export const TestAnchor: FC<{ tag: string; children: ReactNode }> = ({
  tag,
  children,
}) => {
  return <div data-testid={tag}>{children}</div>;
};
