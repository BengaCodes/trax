import React, { FC } from "react";
import {
  List,
  ListItem,
  LinkBox,
  LinkOverlay,
  ListIcon,
} from "@chakra-ui/layout";
import NextLink from "next/link";
import { IconType } from "react-icons";

interface MenuItems {
  name: string;
  icon: IconType;
  route: string;
}

type MenuItemProps = {
  menus: MenuItems[];
};

const MenuItem: FC<MenuItemProps> = ({ menus }) => {
  return (
    <List>
      {menus.map((menu) => (
        <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
          <LinkBox>
            <NextLink href={menu.route} passHref>
              <LinkOverlay>
                <ListIcon as={menu.icon} color="white" marginRight="20px" />
                {menu.name}
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        </ListItem>
      ))}
    </List>
  );
};

export default MenuItem;
