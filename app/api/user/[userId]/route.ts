import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB"; // Kết nối cơ sở dữ liệu
import { auth } from "@clerk/nextjs/server"; // Xác thực từ Clerk
import { NextRequest, NextResponse } from "next/server";


export const DELETE = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectToDB();

        const deleteUser = await User.findByIdAndDelete(params.userId);

        if (!deleteUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        return new NextResponse("User deleted", { status: 200 });
    } catch (error) {
        console.log("[User_DELETE] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};


