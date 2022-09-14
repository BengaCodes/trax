/* eslint-disable dot-notation */
/* eslint-disable @next/next/no-server-import-in-page */

import { NextResponse } from "next/server";

const signedinPages = ["/", "/playlist", "/library"];

export default function middleware(req) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.get("TRAX_ACCESS_TOKEN");

    if (!token) {
      return NextResponse.redirect("http://localhost:3000/auth/signin");
    }
  }
}
