import { NextResponse } from "next/server";

/* adaptar logica con auth y el redux */
export function middleware(request: any) {
    const user = 'loggedInUser';

  if (!user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: '/admin',
}