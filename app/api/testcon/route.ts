import { connectToDatabase } from "@/lib/database/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("GET request received"); // Log to check if this is hit
  try {
    await connectToDatabase();
    return NextResponse.json({ message: 'MongoDB is connected!' });
  } catch (error: unknown) {
    // Type assertion to extract the error message
    if (error instanceof Error) {
      // If the error is an instance of Error, you can access its message
      return NextResponse.json({ message: 'Failed to connect to MongoDB', error: error.message }, { status: 500 });
    } else {
      // Fallback for unexpected error types
      return NextResponse.json({ message: 'Failed to connect to MongoDB', error: 'Unknown error' }, { status: 500 });
    }
  }
}
