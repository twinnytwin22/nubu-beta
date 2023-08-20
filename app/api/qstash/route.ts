import { NextResponse } from 'next/server';
import { verifySignature } from "@upstash/qstash/nextjs";

// This function will handle your POST request
export async function POST(request, response) {
  try {
    console.log("If this is printed, the signature has already been verified");

    return NextResponse.json({ success: true });
  } catch (error) {
    // Handle errors and send an appropriate response
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

// Use verifySignature to ensure the request is coming from a trusted source
export default verifySignature(POST);

