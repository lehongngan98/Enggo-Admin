import User from "@/lib/models/User";

import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

// GET Handler: Lấy danh sách tất cả các chủ đề từ vựng
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const user = await User.find().sort({ createdAt: "desc" });

    console.log("user :", user);

    // return NextResponse.json(user, { status: 200 });
    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: {
        "Cache-Control": "no-store", // Ngăn cache
      },
    });
  } catch (error) {
    console.log("[user_GET] :", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
