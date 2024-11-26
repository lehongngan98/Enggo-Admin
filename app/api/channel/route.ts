import BilingualTopics from "@/lib/models/BilingualTopic";
import Channel from "@/lib/models/Channel";
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

        const {title, description, channelId  } = await req.json();

        if (!title || !description || !channelId) {
            return new NextResponse("All fields are required", { status: 400 });
        }

        
        const channel = await Channel.findOne({ channelId });

        if (channel) {
            return new NextResponse("Channel  already exists", { status: 400 });
        }

        // Tạo chủ đề từ vựng mới
        const newChannel = await Channel.create({
            title, description, channelId 
        });

        await newChannel.save();
        console.log("[newChannel_POST] : New newChannel  created");
        return NextResponse.json(newChannel, { status: 201 });
    } catch (error) {
        console.log("[newChannel_POST] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

// GET Handler: Lấy danh sách tất cả các chủ đề từ vựng
export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const channel = await Channel.find()
            .sort({ createdAt: "desc" });

        return NextResponse.json(channel, { status: 200 });
    } catch (error) {
        console.log("[channel_GET] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
