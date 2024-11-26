import Quote from "@/lib/models/Quote"; // Import the Quote model
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// POST Handler: Create a new quote
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB();

    const { author, text, words } = await req.json();

    if (!author || !text || !words || !Array.isArray(words)) {
      return new NextResponse("All fields are required, and words must be an array", { status: 400 });
    }

    // Check if the quote already exists
    const existingQuote = await Quote.findOne({ text });

    if (existingQuote) {
      return new NextResponse("Quote already exists", { status: 400 });
    }

    // Create a new quote
    const newQuote = await Quote.create({
      author,
      text,
      words,
    });

    await newQuote.save();
    console.log("[quote_POST] : New quote created");
    return NextResponse.json(newQuote, { status: 201 });
  } catch (error) {
    console.log("[quote_POST] :", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// GET Handler: Fetch all quotes
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const quotes = await Quote.find()
      .sort({ createdAt: "desc" });

    return NextResponse.json(quotes, { status: 200 });
  } catch (error) {
    console.log("[quote_GET] :", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
