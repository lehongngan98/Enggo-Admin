import Quote from "@/lib/models/Quote"; // Import the Quote model
import { connectToDB } from "@/lib/mongoDB"; // Connect to the database
import { auth } from "@clerk/nextjs/server"; // Authentication from Clerk
import { NextRequest, NextResponse } from "next/server";

// GET Handler: Fetch a specific quote by ID
export const GET = async (
  req: NextRequest,
  { params }: { params: { quoteId: string } }
) => {
  try {
    await connectToDB();

    const quote = await Quote.findById(params.quoteId);
    console.log("quote :", quote);

    if (!quote) {
      return new NextResponse("Quote not found", { status: 404 });
    }

    return NextResponse.json(quote, { status: 200 });
  } catch (error) {
    console.log("[quote_GET_BY_ID] :", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// DELETE Handler: Delete a specific quote by ID
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { quoteId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB();

    const deletedQuote = await Quote.findByIdAndDelete(params.quoteId);

    if (!deletedQuote) {
      return new NextResponse("Quote not found", { status: 404 });
    }

    return new NextResponse("Quote deleted", { status: 200 });
  } catch (error) {
    console.log("[quote_DELETE] :", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// POST Handler: Update a specific quote by ID
export const POST = async (
  req: NextRequest,
  { params }: { params: { quoteId: string } }
) => {
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

    const updatedQuote = await Quote.findByIdAndUpdate(
      params.quoteId,
      { author, text, words },
      { new: true }
    );

    if (!updatedQuote) {
      return new NextResponse("Quote not found", { status: 404 });
    }

    return NextResponse.json(updatedQuote, { status: 200 });
  } catch (error) {
    console.log("[quote_POST] :", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
