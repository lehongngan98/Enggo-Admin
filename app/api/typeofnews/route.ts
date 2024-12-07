import TypeOfNews from "@/lib/models/TypeOfNews";
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

        const { title} = await req.json();

        const existingTypeOfNews = await TypeOfNews.findOne({title})

        if(existingTypeOfNews){
            return new NextResponse("TypeOfNews already exists", { status: 400 });
        }

        if(!title){
            return new NextResponse("Title is required", { status: 401 });
        }

        const newtypeOfNews = await TypeOfNews.create({
            title,                 
        })

        await newtypeOfNews.save();

        return new NextResponse(newtypeOfNews, { status: 201 });
        
    } catch (error) {
        console.log("[TypeOfNewss_POST] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const typeOfNewss = await TypeOfNews.find().sort({ createdAt: "desc" }).populate('news');;

        console.log("Fetched typeOfNewss:", typeOfNewss); // Add this for debugging

        return NextResponse.json(typeOfNewss, { status: 200 });
    } catch (error) {
        console.log("[typeOfNewss_GET] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
