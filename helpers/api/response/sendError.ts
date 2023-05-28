import { NextResponse } from "next/server";

export default function sendError(message: string, status: number = 401, data?: any) {
  return NextResponse.json(
    {
      success: false,
      message,
      data,
    },
    {
      status,
    }
  );
}
