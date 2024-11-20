import News from "@/lib/models/News";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { newsId: string } }) => {
  try {

    await connectToDB();

    const news = await News.findById(params.newsId);

    if (!news) {
      return new NextResponse(JSON.stringify({ message: "News not found" }), { status: 404 });
    }

    return  NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.log("[newsId_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (req: NextRequest, { params }: { params: { newsId: string } }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    };

    await connectToDB();

    let news = await News.findById(params.newsId);

    if (!news) {
      return new NextResponse(JSON.stringify({ message: "news not found" }), { status: 404 });
    }

    const { title, content, image } = await req.json();

    if(!title || !image || !content) {
      return new NextResponse("Title or Image or Content are required", { status: 400 });
    }

    news = await News.findByIdAndUpdate(params.newsId, { title, content, image }, { new: true });

    await news.save();

    return  NextResponse.json(news, { status: 200 });

  } catch (error) {
    console.log("[newsId_UPDATE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { newsId: string } }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    };

    await connectToDB();

    await News.findByIdAndDelete(params.newsId);

    return new NextResponse("News is deleted!", { status: 200 });

  } catch (error) {
    console.log("[newsId_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });

  }
};