import { NextRequest, NextResponse } from "next/server";
import { appendContactData } from "@/libs/googleSheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await appendContactData(body);
    return NextResponse.json({ message: "Contact data appended to Google Sheets successfully." });
  } catch (error: any) {
    console.error("Error appending contact data to Google Sheets:", error);
    return NextResponse.json(
      { error: error.message || "Error appending data to Google Sheets." },
      { status: 500 }
    );
  }
}
