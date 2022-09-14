import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image, Spinner } from "@chakra-ui/react";
import React from "react";
import GradientLayout from "../components/GradientLayout";
import { useMe } from "../lib/hooks";
import prisma from "../lib/prisma";

const Home = ({ artists }) => {
  const { user, isLoading } = useMe();

  if (isLoading)
    return (
      <Flex justify="center" align="center">
        <Spinner />
      </Flex>
    );

  return (
    <GradientLayout
      subtitle="Profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.usersPlaylistCount} public playlists`}
      color="green"
      image="https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0?table=block&id=33f9771b-0e6f-4a72-832c-69ed2d41f290&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=2000&userId=&cache=v2"
      roundImage
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top Artists this month
          </Text>
          <Text fontSize="md">Only visible to you</Text>
        </Box>
        <Flex>
          {artists?.map((artist: any) => (
            <Box key={artist.id} paddingX="10px" width="20%">
              <Box bg="gray.900" borderRadius="4px" padding="16px" width="100%">
                <Image
                  src="https://people.com/thmb/OfzGlqlplposLvMb9xLKyubOn-0=/1412x2000/filters:fill(auto,1)/jay-z-and-blue-ivy-db4ab3b71b8341f2b2bb0fd8c142a1ad.jpg"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
