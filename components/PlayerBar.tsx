import { Box, Flex, Text } from "@chakra-ui/layout";
import { useStoreState } from "easy-peasy";
import Player from "./Player";

const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const song = useStoreState((state: any) => state.activeSong);

  return (
    <Box height="100px" width="100vw" bg="gray.900">
      <Flex align="center">
        {!song ? null : (
          <Box padding="20px" color="white" width="30%">
            <Text fontSize="large">{song?.name}</Text>
            <Text fontSize="sm">{song?.artist.name}</Text>
          </Box>
        )}
        <Box width="40%">
          {song ? <Player songs={songs} activeSong={song} /> : null}
        </Box>
        <Box width="30%" justifySelf="flex-end" textAlign="center">
          Volume
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
