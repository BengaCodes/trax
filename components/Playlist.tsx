import React, { FC } from "react";
import { List, ListItem, LinkBox, LinkOverlay } from "@chakra-ui/layout";
import NextLink from "next/link";

interface PlaylistItems {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  songs: {}[];
  user: {};
  userId: number;
}

type PlaylistItemProps = {
  playlists: PlaylistItems[];
};

const Playlist: FC<PlaylistItemProps> = ({ playlists = [] }) => {
  return (
    <List>
      {playlists?.map((playlist) => (
        <ListItem paddingX="20px" fontSize="16px" key={playlist.id}>
          <LinkBox>
            <NextLink
              href={{ pathname: "/playlist/[id]", query: { id: playlist.id } }}
              passHref
            >
              <LinkOverlay>{playlist.name}</LinkOverlay>
            </NextLink>
          </LinkBox>
        </ListItem>
      ))}
    </List>
  );
};

export default Playlist;
