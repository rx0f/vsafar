import { NextResponse } from "next/server";

export default function sendResponse(
  data: any,
  message: string,
  status: number = 200
) {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    {
      status,
    }
  );
}
