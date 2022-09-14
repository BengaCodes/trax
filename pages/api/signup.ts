import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type User = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, firstName, lastName } = req.body;
  const salt = bcrypt.genSaltSync();

  let user: User;

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
        firstName,
        lastName,
      },
    });
  } catch (e) {
    res.status(401).json({ error: "User already exists" });
    return;
  }

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

  res.json(user);
};
