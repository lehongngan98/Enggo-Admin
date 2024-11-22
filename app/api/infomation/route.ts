
import Infomation from "@/lib/models/Information";
import News from "@/lib/models/News";
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

    const { subTitle, image, text, news } = await req.json();

    if (!subTitle || !image || !text || !news) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const newInfomation = await Infomation.create({
      subTitle,
      image,
      text,
      news,
    });

    // Save the infomaion
    await newInfomation.save();
    console.log("newInfomation :", newInfomation);

    if (news) {

      const NewsUpdate = await News.findById(news);
      if (NewsUpdate) {
        NewsUpdate.information.push(newInfomation._id); // Push only the _id of the new product
        await NewsUpdate.save();
      }
    }
    console.log("New infomation created:", newInfomation);

    return NextResponse.json(newInfomation, { status: 201 });

  } catch (error) {
    console.log("[collections_POST] :", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};



export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const infomation = await Infomation.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "news", model: News });

    console.log("infomation :", infomation);


    return NextResponse.json(infomation, { status: 200 });

  } catch (error) {
    console.log("[infomation] :", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};