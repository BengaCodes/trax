import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user) => {
    try {
      const list = await prisma.playlist.findMany({
        where: { userId: user.id },
        orderBy: {
          name: "asc",
        },
      });
      if (!list || !list.length) {
        throw new Error("No playlist found");
      }
      res.status(200).json(list);
    } catch (e) {
      res.status(404).json({ error: "No playlist found" });
    }
  }
);
