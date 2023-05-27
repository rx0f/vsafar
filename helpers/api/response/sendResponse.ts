import { NextResponse } from "next/server";

export default function sendResponse(data: any, message: string) {
  return NextResponse.json({
    success: true,
    data,
    message,
  });
}
