import Communication from "@/lib/models/Communication";
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
        const existingCommunication = await Communication.findOne({ titleEn });

        if (existingCommunication) {
            return new NextResponse("communication topic already exists", { status: 400 });
        }

        // Tạo chủ đề từ vựng mới
        const newCommunication = await Communication.create({
            image,
            titleEn,
            titleVn,
            vocab,
        });

        await newCommunication.save();
        console.log("[Communication_POST] : New Communication topic created");
        return NextResponse.json(newCommunication, { status: 201 });
    } catch (error) {
        console.log("[vocabulary_POST] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

// GET Handler: Lấy danh sách tất cả các chủ đề từ vựng
export const GET = async (req: NextRequest) => {
  try {
      await connectToDB();

      const communication = await Communication.find()
          .sort({ createdAt: "desc" });

      return NextResponse.json(communication, { status: 200 });
  } catch (error) {
      console.log("[Communication_GET] :", error);
      return new NextResponse("Internal Server Error", { status: 500 });
  }
};
