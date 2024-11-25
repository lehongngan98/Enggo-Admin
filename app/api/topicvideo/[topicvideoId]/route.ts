import TopicVideo from "@/lib/models/TopicVideo"; // Import mô hình TopicVideo
import { connectToDB } from "@/lib/mongoDB"; // Kết nối cơ sở dữ liệu
import { auth } from "@clerk/nextjs/server"; // Xác thực từ Clerk
import { NextRequest, NextResponse } from "next/server";

// GET a specific topic by ID
export const GET = async (
  req: NextRequest,
  { params }: { params: { topicvideoId: string } }
) => {
  try {
    await connectToDB(); // Đảm bảo kết nối tới cơ sở dữ liệu

    const topic = await TopicVideo.findById(params.topicvideoId); // Tìm chủ đề video theo ID
    if (!topic) {
      return new NextResponse(
        JSON.stringify({ message: "Topic not found" }),
        { status: 404 }
      );
    }

    console.log("topic :", topic);
    
    return NextResponse.json(topic, { status: 200 });
  } catch (error) {
    console.error("[topicId_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// Update a specific topic by ID
export const POST = async (
  req: NextRequest,
  { params }: { params: { topicvideoId: string } }
) => {
  try {
    const { userId } = auth(); // Xác thực người dùng

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let topic = await TopicVideo.findById(params.topicvideoId);

    if (!topic) {
      return new NextResponse(
        JSON.stringify({ message: "Topic not found" }),
        { status: 404 }
      );
    }

    const { title, background, Items } = await req.json(); // Trích xuất dữ liệu từ body

    if (!title || !background || !Items || !Array.isArray(Items)) {
      return new NextResponse(
        JSON.stringify({ message: "Bad Request: Missing fields or invalid format" }),
        { status: 400 }
      );
    }

    topic = await TopicVideo.findByIdAndUpdate(
      params.topicvideoId,
      { title, background, Items },
      { new: true } // Trả về tài liệu mới sau khi cập nhật
    );

    await topic.save();

    return NextResponse.json(topic, { status: 200 });
  } catch (error) {
    console.error("[topicvideoId_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// DELETE a specific topic by ID
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { topicvideoId: string } }
) => {
  try {
    const { userId } = auth(); // Xác thực người dùng

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const topic = await TopicVideo.findById(params.topicvideoId);

    if (!topic) {
      return new NextResponse(
        JSON.stringify({ message: "Topic not found" }),
        { status: 404 }
      );
    }

    await TopicVideo.findByIdAndDelete(params.topicvideoId);

    return new NextResponse("Topic is deleted!", { status: 200 });
  } catch (error) {
    console.error("[topicId_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
