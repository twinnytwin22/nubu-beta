import { verifySignature } from "@upstash/qstash/nextjs";
import { NextResponse } from "next/server";

async function POST() {
  console.log("If this is printed, the signature has already been verified");

  NextResponse.json({'status': 200})
  // do stuff
}

export default verifySignature(POST);

