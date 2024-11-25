import Vocabulary from "@/lib/models/Vocabulary"; // Import mô hình Vocabulary
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// POST Handler: Tạo một chủ đề từ vựng mới
export const POST = async (req: NextRequest) => {
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

        // Kiểm tra xem chủ đề từ vựng đã tồn tại chưa
        const existingVocabulary = await Vocabulary.findOne({ titleEn });

        if (existingVocabulary) {
            return new NextResponse("Vocabulary topic already exists", { status: 400 });
        }

        // Tạo chủ đề từ vựng mới
        const newVocabulary = await Vocabulary.create({
            image,
            titleEn,
            titleVn,
            vocab,
        });

        await newVocabulary.save();
        console.log("[vocabulary_POST] : New vocabulary topic created");
        return NextResponse.json(newVocabulary, { status: 201 });
    } catch (error) {
        console.log("[vocabulary_POST] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

// GET Handler: Lấy danh sách tất cả các chủ đề từ vựng
export const GET = async (req: NextRequest) => {
  try {
      await connectToDB();

      const vocabularies = await Vocabulary.find()
          .sort({ createdAt: "desc" });

      return NextResponse.json(vocabularies, { status: 200 });
  } catch (error) {
      console.log("[vocabulary_GET] :", error);
      return new NextResponse("Internal Server Error", { status: 500 });
  }
};
