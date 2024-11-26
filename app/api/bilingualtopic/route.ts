import BilingualTopics from "@/lib/models/BilingualTopic";
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

        const { topic, subTopic } = await req.json();

        if (!topic || !subTopic || !Array.isArray(subTopic)) {
            return new NextResponse("All fields are required, and vocab must be an array", { status: 400 });
        }

        // Kiểm tra xem chủ đề từ vựng đã tồn tại chưa
        const bilingualTopics = await BilingualTopics.findOne({ topic });

        if (bilingualTopics) {
            return new NextResponse("BilingualTopics  already exists", { status: 400 });
        }

        // Tạo chủ đề từ vựng mới
        const newBilingualTopics = await BilingualTopics.create({
            topic, subTopic
        });

        await newBilingualTopics.save();
        console.log("[BilingualTopics_POST] : New BilingualTopics  created");
        return NextResponse.json(newBilingualTopics, { status: 201 });
    } catch (error) {
        console.log("[BilingualTopics_POST] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

// GET Handler: Lấy danh sách tất cả các chủ đề từ vựng
export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const bilingualTopics = await BilingualTopics.find()
            .sort({ createdAt: "desc" });

        return NextResponse.json(bilingualTopics, { status: 200 });
    } catch (error) {
        console.log("[BilingualTopics_GET] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
