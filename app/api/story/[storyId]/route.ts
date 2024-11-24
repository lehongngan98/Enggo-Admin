import Story from "@/lib/models/Story"; // Import your Story model
import { connectToDB } from "@/lib/mongoDB"; // Connect to MongoDB
import { auth } from "@clerk/nextjs/server"; // Authentication from Clerk
import { NextRequest, NextResponse } from "next/server";

// GET a specific story by ID
export const GET = async (
  req: NextRequest,
  { params }: { params: { storyId: string } }
) => {
  try {
    await connectToDB(); // Ensure the database is connected

    const story = await Story.findById(params.storyId); // Fetch the story by ID
    console.log("get story :", story);
    

    if (!story) {
      return new NextResponse(
        JSON.stringify({ message: "Story not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(story, { status: 200 });
  } catch (error) {
    console.error("[storyId_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// Update a specific story by ID
export const POST = async (
  req: NextRequest,
  { params }: { params: { storyId: string } }
) => {
  try {
    const { userId } = auth(); // Get authenticated user ID

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let story = await Story.findById(params.storyId);

    if (!story) {
      return new NextResponse(
        JSON.stringify({ message: "Story not found" }),
        { status: 404 }
      );
    }

    const { nameVn,nameEn,content,image,words } = await req.json(); // Extract data from the request body

    if (!nameVn || !nameEn || !content || !image || !words) {
      return new NextResponse("Bad required", { status: 400 });
    }

    story = await Story.findByIdAndUpdate(
      params.storyId,
      { nameVn,nameEn,content,image,words },
      { new: true }
    );

    await story.save();

    return NextResponse.json(story, { status: 200 });
  } catch (error) {
    console.error("[storyId_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// DELETE a specific story by ID
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { storyId: string } }
) => {
  try {
    const { userId } = auth(); // Get authenticated user ID

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await Story.findByIdAndDelete(params.storyId);

    return new NextResponse("Story is deleted!", { status: 200 });
  } catch (error) {
    console.error("[storyId_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
