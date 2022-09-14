import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";

export default validateRoute(async (req, res, user) => {
  const usersPlaylistCount = await prisma.playlist.count({
    where: { userId: user?.id },
  });

  res.json({ ...user, usersPlaylistCount });
});
