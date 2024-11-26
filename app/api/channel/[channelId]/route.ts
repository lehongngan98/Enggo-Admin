import Channel from "@/lib/models/Channel";
import { connectToDB } from "@/lib/mongoDB"; // Kết nối cơ sở dữ liệu
import { auth } from "@clerk/nextjs/server"; // Xác thực từ Clerk
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { channelId: string } }
) => {
    try {
        await connectToDB();

        const channel = await Channel.findById(params.channelId);
        console.log("channel :", channel);
        

        if (!channel) {
            return new NextResponse("channel topic not found", { status: 404 });
        }

        return NextResponse.json(channel, { status: 200 });
    } catch (error) {
        console.log("[channelId_GET_BY_ID] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};


export const DELETE = async (
  req: NextRequest,
  { params }: { params: { channelId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectToDB();

        const deletedchannel = await Channel.findByIdAndDelete(params.channelId);

        if (!deletedchannel) {
            return new NextResponse("channel not found", { status: 404 });
        }

        return new NextResponse("channel deleted", { status: 200 });
    } catch (error) {
        console.log("[channel_DELETE] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};



export const POST = async (
  req: NextRequest,
  { params }: { params: { channelId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectToDB();

        const { title, description, channelId  } = await req.json();

        if (!title || !description|| !channelId) {
            return new NextResponse("All fields are required", { status: 400 });
        }

        const updatedchannel = await Channel.findByIdAndUpdate(
            params.channelId,
            { title, description, channelId  },
            { new: true }
        );

        if (!updatedchannel) {
            return new NextResponse("channel topic not found", { status: 404 });
        }

        return NextResponse.json(updatedchannel, { status: 200 });
    } catch (error) {
        console.log("[channel_PUT] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};


