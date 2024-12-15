
import News from "@/lib/models/News";
import TypeOfNews from "@/lib/models/TypeOfNews";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const { content, image, information, typeofnews ,title} = await req.json();

    console.log("content :", content);
    console.log("image :", image);
    console.log("information :", information);
    console.log("typeofnews :", typeofnews);
    console.log("title :", title);


    

    if (!content || !image || !information || !typeofnews) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const newNews = await News.create({
      title,
      content,
      image,
      information: information,
      typeofnews
    });

    console.log("newNews :", newNews);
    

    // Save the product
    await newNews.save();

    // Update collections with the new product's ObjectId
    if (typeofnews) {
      const typeOfNews = await TypeOfNews.findById(typeofnews);
      if (typeOfNews) {
        typeOfNews.news.push(newNews._id); // Push only the _id of the new product
        await typeOfNews.save();
      }
    }


    return NextResponse.json(newNews, { status: 201 });

  } catch (error) {
    console.log("[News_POST] :", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};




export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const news = await News.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "typeofnews", model: TypeOfNews });

    return NextResponse.json(news, { status: 200 });

  } catch (error) {
    console.log("[news] :", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};