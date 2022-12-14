import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

interface JwtPayload {
  id: string;
}

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { TRAX_ACCESS_TOKEN: token } = req.cookies;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, "Hello-Sarah") as JwtPayload;
        user = await prisma.user.findUnique({
          where: { id: Number(id) },
        });

        if (!user) {
          throw new Error("Not real user");
        }
      } catch (e) {
        res.status(401).json({ error: "Not Authorized" });
      }

      return handler(req, res, user);
    }

    res.status(401).json({ error: "Not Authorized" });
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, "Hello-Sarah");
  return user;
};
