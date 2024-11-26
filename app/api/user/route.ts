import BilingualTopics from "@/lib/models/BilingualTopic";
import user from "@/lib/models/Channel";
import Communication from "@/lib/models/Communication";
import User from "@/lib/models/User";
import Vocabulary from "@/lib/models/Vocabulary"; // Import mô hình Vocabulary
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


// GET Handler: Lấy danh sách tất cả các chủ đề từ vựng
export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const user = await User.find()
            .sort({ createdAt: "desc" });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.log("[user_GET] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
