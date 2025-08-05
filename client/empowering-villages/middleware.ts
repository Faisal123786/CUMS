import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/register"];

export function middleware(req: NextRequest) {
  console.log(req.cookies);
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;
  const url = req.nextUrl.clone();
  if(token && ['/login', '/register'].includes(pathname)){
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher:  [
    "/",                  
    "/login",             
    "/register",          
    "/dashboard/:path*",      
  ],
};
