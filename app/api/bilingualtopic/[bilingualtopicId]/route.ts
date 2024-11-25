import BilingualTopics from "@/lib/models/BilingualTopic";
import { connectToDB } from "@/lib/mongoDB"; // Kết nối cơ sở dữ liệu
import { auth } from "@clerk/nextjs/server"; // Xác thực từ Clerk
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { bilingualtopicId: string } }
) => {
    try {
        await connectToDB();

        const bilingualtopic = await BilingualTopics.findById(params.bilingualtopicId);
        console.log("bilingualtopic :", bilingualtopic);
        

        if (!bilingualtopic) {
            return new NextResponse("bilingualtopic topic not found", { status: 404 });
        }

        return NextResponse.json(bilingualtopic, { status: 200 });
    } catch (error) {
        console.log("[bilingualtopicId_GET_BY_ID] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};


export const DELETE = async (
  req: NextRequest,
  { params }: { params: { bilingualtopicId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectToDB();

        const deletedbilingualtopic = await BilingualTopics.findByIdAndDelete(params.bilingualtopicId);

        if (!deletedbilingualtopic) {
            return new NextResponse("bilingualtopic topic not found", { status: 404 });
        }

        return new NextResponse("bilingualtopic topic deleted", { status: 200 });
    } catch (error) {
        console.log("[bilingualtopic_DELETE] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};



export const POST = async (
  req: NextRequest,
  { params }: { params: { bilingualtopicId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectToDB();

        const { topic, subTopic } = await req.json();

        if (!topic || !subTopic|| !Array.isArray(subTopic)) {
            return new NextResponse("All fields are required, and vocab must be an array", { status: 400 });
        }

        const updatedBilingualtopic = await BilingualTopics.findByIdAndUpdate(
            params.bilingualtopicId,
            { topic, subTopic },
            { new: true }
        );

        if (!updatedBilingualtopic) {
            return new NextResponse("bilingualtopic topic not found", { status: 404 });
        }

        return NextResponse.json(updatedBilingualtopic, { status: 200 });
    } catch (error) {
        console.log("[bilingualtopic_PUT] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};


