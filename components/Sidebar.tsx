import { Box, Divider } from "@chakra-ui/layout";
import {
  MdHome,
  // MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import React, { FC } from "react";
import NextImage from "next/image";
// import NextLink from "next/link";
import MenuItem from "./MenuItem";
import Playlist from "./Playlist";
import { usePlaylist } from "../lib/hooks";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdHome,
    route: "/search",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/favorite",
  },
];

const Sidebar: FC = () => {
  const { playlists } = usePlaylist();

  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/logo.svg" height={60} width={120} />
        </Box>
        <Box marginBottom="20px">
          <MenuItem menus={navMenu} />
        </Box>
        <Box>
          <MenuItem menus={musicMenu} />
        </Box>
        <Divider height="1px" bg="gray" marginY="20px" />
        <Box height="66%" overflowY="auto" paddingY="20px">
          <Playlist playlists={playlists} />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
