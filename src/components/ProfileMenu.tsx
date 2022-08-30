import React from "react";
import { firebaseAPI } from "..";

import { Avatar, Menu, Popover, Position, toaster } from "evergreen-ui";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors";

export const ProfileMenu = () => {
  const user = useSelector(userSelector);
  return (
    <Popover
      position={Position.BOTTOM_LEFT}
      content={
        <Menu>
          <Menu.Group>
            <Menu.Item onSelect={() => toaster.notify("Photo")}>
              Change Photo...
            </Menu.Item>
          </Menu.Group>
          <Menu.Divider />
          <Menu.Group>
            <Menu.Item onSelect={() => firebaseAPI.signOut()} intent="danger">
              Sign Out...
            </Menu.Item>
          </Menu.Group>
        </Menu>
      }
    >
      <Avatar src={user.photo ?? undefined} name={user.displayName} size={40} />
    </Popover>
  );
};
