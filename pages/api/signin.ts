import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    const UserPassword = bcrypt.compareSync(password, user.password);

    if (!user || !UserPassword)
      return res.status(401).json({ error: "Access Denied" });

    const token = jwt.sign(
      {
        email: user?.email,
        id: user?.id,
        time: Date.now(),
      },
      "Hello-Sarah",
      { expiresIn: "8h" }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("TRAX_ACCESS_TOKEN", token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );

    res.status(200).json(user);
  } catch (e) {
    res.status(401).json({ error: "Email or Password is incorrect" });
  }
};
