import Infomation from "@/lib/models/Information";
import News from "@/lib/models/News";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if(!userId){
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectToDB();

        const { title, content, image } = await req.json();

        const existingCollection = await News.findOne({title})

        if(existingCollection){
            return new NextResponse("News already exists", { status: 400 });
        }

        if(!title || !image || !content){
            return new NextResponse("Title or Image or Content are required", { status: 400 });
        }

        const newNews = await News.create({
            title,
            content,
            image,            
        })

        await newNews.save();

        return new NextResponse(newNews, { status: 201 });
        
    } catch (error) {
        console.log("[news_POST] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const news = await News.find().sort({ createdAt: "desc" }).populate({ path: "information", model: Infomation });
        // const news = await News.find().sort({ createdAt: "desc" });

        console.log("Fetched news:", news); // Add this for debugging

        return NextResponse.json(news, { status: 200 });
    } catch (error) {
        console.log("[news_GET] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
