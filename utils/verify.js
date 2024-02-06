import { verify } from "jsonwebtoken";

export function verifyAuthentication(token) {
  if (token == undefined) {
    console.log("token is undefine");
    return 0;
  }
  try {
    const decode = verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
    console.log("i m deecode");
    return 1;
  } catch (e) {
    console.log("i m error", e);
    return 0;
  }
  return;
}
