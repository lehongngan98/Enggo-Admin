import Communication from "@/lib/models/Communication";

import { connectToDB } from "@/lib/mongoDB"; // Kết nối cơ sở dữ liệu
import { auth } from "@clerk/nextjs/server"; // Xác thực từ Clerk
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { communicationId: string } }
) => {
    try {
        await connectToDB();

        const communication = await Communication.findById(params.communicationId);
        console.log("communication :", communication);
        

        if (!communication) {
            return new NextResponse("communication topic not found", { status: 404 });
        }

        return NextResponse.json(communication, { status: 200 });
    } catch (error) {
        console.log("[vocabulary_GET_BY_ID] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};


export const DELETE = async (
  req: NextRequest,
  { params }: { params: { communicationId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectToDB();

        const deletedCommunication = await Communication.findByIdAndDelete(params.communicationId);

        if (!deletedCommunication) {
            return new NextResponse("Communication topic not found", { status: 404 });
        }

        return new NextResponse("Communication topic deleted", { status: 200 });
    } catch (error) {
        console.log("[Communication_DELETE] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};



export const POST = async (
  req: NextRequest,
  { params }: { params: { communicationId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectToDB();

        const { image, titleEn, titleVn, vocab } = await req.json();

        if (!image || !titleEn || !titleVn || !vocab || !Array.isArray(vocab)) {
            return new NextResponse("All fields are required, and vocab must be an array", { status: 400 });
        }

        const updatedCommunication = await Communication.findByIdAndUpdate(
            params.communicationId,
            { image, titleEn, titleVn, vocab },
            { new: true }
        );

        if (!updatedCommunication) {
            return new NextResponse("Communication topic not found", { status: 404 });
        }

        return NextResponse.json(updatedCommunication, { status: 200 });
    } catch (error) {
        console.log("[Communication_PUT] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};


