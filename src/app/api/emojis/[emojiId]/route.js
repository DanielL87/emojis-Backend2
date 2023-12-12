import { emojis } from "@/app/lib/emojis.js";

import { NextResponse } from "next/server.js";

export function GET(request, response) {
  const { emojiId } = response.params;
  const emoji = emojis.filter((emoji) => emoji.id === +emojiId)[0];
  if (!emoji) {
    return NextResponse.json({
      success: false,
      message: "No emoji with that ID found.",
    });
  }
  return NextResponse.json({ success: true, emoji });
}

export function DELETE(request, response) {
  try {
    const { emojiId } = response.params;

    const emoji = emojis.filter((emoji) => emoji.id === +emojiId)[0];
    const emojiIndex = emojis.findIndex((e) => e.id === +emojiId);

    if (emojiIndex !== -1) {
      emojis.splice(emojiIndex, 1);
      return NextResponse.json({
        success: true,
        message: emoji,
      });
    } else {
      return NextResponse.json({ success: false, message: "Emoji not found" });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(request, response) {
  try {
    const { emojiId } = response.params;
    const { name, character } = await request.json();

    if (!name || !character) {
      return NextResponse.json({
        success: false,
        message: "Both name and character are required for the update.",
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

    const emojiIndex = emojis.findIndex((e) => e.id === +emojiId);

    if (emojiIndex !== -1) {
      emojis[emojiIndex] = {
        ...emojis[emojiIndex],
        character,
        name,
      };
      const emoji = emojis.filter((emoji) => emoji.id === +emojiId)[0];
      console.log(emojis);

      return NextResponse.json({
        success: true,
        emoji,
      });
    } else {
      return NextResponse.json({ success: false, message: "Emoji not found" });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
