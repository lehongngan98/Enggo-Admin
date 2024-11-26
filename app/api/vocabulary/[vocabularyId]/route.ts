
import Vocabulary from "@/lib/models/Vocabulary";
import { connectToDB } from "@/lib/mongoDB"; // Kết nối cơ sở dữ liệu
import { auth } from "@clerk/nextjs/server"; // Xác thực từ Clerk
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { vocabularyId: string } }
) => {
    try {
        await connectToDB();

        const vocabulary = await Vocabulary.findById(params.vocabularyId);
        console.log("vocabulary :", vocabulary);
        

        if (!vocabulary) {
            return new NextResponse("Vocabulary topic not found", { status: 404 });
        }

        return NextResponse.json(vocabulary, { status: 200 });
    } catch (error) {
        console.log("[vocabulary_GET_BY_ID] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};


export const DELETE = async (
  req: NextRequest,
  { params }: { params: { vocabularyId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectToDB();

        const deletedVocabulary = await Vocabulary.findByIdAndDelete(params.vocabularyId);

        if (!deletedVocabulary) {
            return new NextResponse("Vocabulary topic not found", { status: 404 });
        }

        return new NextResponse("Vocabulary topic deleted", { status: 200 });
    } catch (error) {
        console.log("[vocabulary_DELETE] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};



export const POST = async (
  req: NextRequest,
  { params }: { params: { vocabularyId: string } }
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

        const updatedVocabulary = await Vocabulary.findByIdAndUpdate(
            params.vocabularyId,
            { image, titleEn, titleVn, vocab },
            { new: true }
        );

        if (!updatedVocabulary) {
            return new NextResponse("Vocabulary topic not found", { status: 404 });
        }

        return NextResponse.json(updatedVocabulary, { status: 200 });
    } catch (error) {
        console.log("[vocabulary_PUT] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};


