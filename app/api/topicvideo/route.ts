import TopicVideo from "@/lib/models/TopicVideo"; // Import mô hình TopicVideo
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

// POST Handler: Tạo một chủ đề video mới
export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectToDB();

        const { title, background, Items } = await req.json();

        if (!title || !background || !Items || !Array.isArray(Items)) {
            return new NextResponse("All fields are required, and Items must be an array", { status: 400 });
        }

        // Kiểm tra xem chủ đề video đã tồn tại chưa
        const existingTopic = await TopicVideo.findOne({ title });

        if (existingTopic) {
            return new NextResponse("Topic already exists", { status: 400 });
        }

        // Tạo chủ đề video mới
        const newTopicVideo = await TopicVideo.create({
            title,
            background,
            Items,
        });

        await newTopicVideo.save();
        console.log("[topicvideo_POST] : New topic video created");        
        return NextResponse.json(newTopicVideo, { status: 201 });
    } catch (error) {
        console.log("[topicvideo_POST] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

// GET Handler: Lấy danh sách tất cả các chủ đề video
export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const topics = await TopicVideo.find()
            .sort({ createdAt: "desc" });

        return NextResponse.json(topics, { status: 200 });
    } catch (error) {
        console.log("[topicvideo_GET] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
