import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import Cookie from "js-cookie";

export default async function authMiddleware(req) {
  const jwt = req.headers.Cookie?.split("=")[1];

  const url = req.url;

  console.log(url);
  console.log(jwt);

  if (url && url.includes("/NewPage")) {
    if (jwt == undefined) {
      return NextResponse.redirect("/");
    }
    try {
      verify(jwt, process.env.NEXT_PUBLIC_SECRET_KEY);
      return NextResponse.next();
    } catch (err) {
      NewPage;
      NewPage;
      return NextResponse.redirect("/");
    }
  }
  return NextResponse.next();
}
