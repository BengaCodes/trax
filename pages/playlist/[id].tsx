import GradientLayout from "../../components/GradientLayout";
import SongsTable from "../../components/SongsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

const getBGColor = (id: number): string => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
  ];
  let color: string = "red";

  color = colors[+id - 1];

  if (!colors[+id - 1]) {
    color = "red";
  }

  return color;
};

const Playlist = ({ playlist }) => {
  return (
    <GradientLayout
      color={getBGColor(playlist?.id)}
      title={`${playlist?.name}`}
      subtitle="Playlist"
      image={`https://picsum.photos/400?random=${playlist?.id}`}
      roundImage={false}
      description={`${playlist?.songs.length} songs in your playlist`}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;
  try {
    user = validateToken(req.cookies?.TRAX_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/signin",
      },
    };
  }
  const playlist = await prisma.playlist.findFirst({
    where: { id: +query.id, userId: user?.id },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: {
      playlist,
    },
  };
};

export default Playlist;
