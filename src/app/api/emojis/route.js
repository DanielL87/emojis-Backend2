import { emojis } from "@/app/lib/emojis.js";
import { NextResponse } from "next/server.js";

export function GET() {
  return NextResponse.json({ success: true, emojis });
}

export async function POST(request, response) {
  try {
    const { name, character } = await request.json();

    if (!name || !character) {
      return NextResponse.json({
        success: false,
        error: "You must provide a name and character to create an emoji.",
      });
    }

    // Check if character is a valid emoji using a regular expression
    const emojiRegex = /^[\uD800-\uDFFF].$/; // This is a basic emoji validation, you might need to adjust it based on your requirements

    if (!emojiRegex.test(character)) {
      return NextResponse.json({
        success: false,
        message: "Invalid emoji character format.",
      });
    }

    const emoji = {
      id: emojis.length + 1,
      character,
      name,
    };
    emojis.push(emoji);

    return NextResponse.json({ success: true, emoji });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
