import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { Kafka } from "@upstash/kafka";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.redirect(new URL("/", req.url));
  const nonce = uuid();
  //console.log(nonce);
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  //console.log(session);

  const cspHeaderValue =
    `default-src 'self'; ` +
    `script-src 'self' 'nonce-${nonce}' cdnjs.cloudflare.com; ` +
    `style-src 'self' 'nonce-${nonce}' cdnjs.cloudflare.com; ` +
    `img-src 'self' data:; font-src 'self' cdnjs.cloudflare.com; ` +
    `connect-src 'self'; ` +
    `frame-src 'self'; ` +
    `object-src 'none'`;

  const kafka = new Kafka({
    url: "https://real-goldfish-14081-us1-rest-kafka.upstash.io",
    username: "bWFpbi1yb2RlbnQtNjQwMiQCjmMiRKifErskI3jv8SDO0JyQUDnVuti-_wMZFjo",
    password: "ZTUzZTg5MWQtNzkyOS00NjlmLTg1MzgtNTA3OTEzMmMxYWQ3",
  });
  const message = {
    country: req.geo?.country,
    city: req.geo?.city,
    region: req.geo?.region,
    url: req.url,
    ip: req.headers.get("x-real-ip"),
    mobile: req.headers.get("sec-ch-ua-mobile"),
    platform: req.headers.get("sec-ch-ua-platform"),
    useragent: req.headers.get("user-agent"),
  };

  //

  const p = kafka.producer();
  const topic = "words";

  if (pathname === "/") {
    // await p.produce(topic, JSON.stringify(message));
    return NextResponse.next();
  }

  if (pathname.startsWith("/login") && session) {
    return NextResponse.redirect(new URL("/portal", req.url));
  }

  if (pathname.startsWith("/portal") && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // if (session) {
  //   return user;
  // } else {
  //   return res;
  //  }
}

//export const config = {
//  matcher: ["/portal/:path*"],
//};
