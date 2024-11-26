import User from "@/lib/models/User";

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
