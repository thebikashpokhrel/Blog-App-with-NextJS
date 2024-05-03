import { NextRequest } from "next/server";
import * as jose from "jose";

export async function isAuthenticated(request: NextRequest) {
  //Extract JWT Token and verify
  const token = request.cookies.get("token")?.value || "";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  try {
    const verified = await jose.jwtVerify(token, secret);
    return verified.payload;
  } catch (error) {
    console.log(error);
  }
}
