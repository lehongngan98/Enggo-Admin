import Story from "@/lib/models/Story"; // Create a Story model similar to Collection
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// POST Handler: Create a new story
export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectToDB();

        const { nameEn, nameVn, image, content, words } = await req.json();
        

        if (!nameEn || !nameVn || !image || !content) {
            return new NextResponse("All fields are required", { status: 400 });
        }

        const existingStory = await Story.findOne({ nameEn });
        console.log("Existing story:", existingStory); // Debugging log
        

        if (existingStory) {
            return new NextResponse("Story already exists", { status: 400 });
        }

        const newStory = await Story.create({
            nameEn,
            nameVn,
            image,
            content,
            words,
        });

        await newStory.save();

        return NextResponse.json(newStory, { status: 201 });
    } catch (error) {
        console.log("[story_POST] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

// GET Handler: Fetch all stories
export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const stories = await Story.find()
            .sort({ createdAt: "desc" })
            // .populate("words"); // If words are references, populate them

        console.log("Fetched stories:", stories); // Debugging log

        return NextResponse.json(stories, { status: 200 });
    } catch (error) {
        console.log("[story_GET] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
