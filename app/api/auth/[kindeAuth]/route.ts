import { NextRequest } from "next/server";
import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import type { AuthEndpoints } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { kindeAuth: AuthEndpoints } }
) {
  const endpoint = params.kindeAuth;
  return await handleAuth(request, endpoint);
}
