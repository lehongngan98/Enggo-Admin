
import Infomation from "@/lib/models/Information";
import News from "@/lib/models/News";

import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";




export const GET = async (req: NextRequest, { params }: { params: { infomationId: string } }) => {
  try {

    await connectToDB();

    const infomation = await Infomation.findById(params.infomationId)
      .populate({path : "news",model: News});

    if (!infomation) {
      return new NextResponse(JSON.stringify({ message: "Article not found" }), { status: 404 });
    }

    return NextResponse.json(infomation, { status: 200 });
  } catch (error) {
    console.log("[infomationId_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};



export const DELETE = async (req: NextRequest, { params }: { params: { infomationId: string } }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const infomationId = params.infomationId;

    // Find the product to access its collections before deletion
    const infomation = await Infomation.findById(infomationId);

    if (!infomation) {
      return new NextResponse("infomation not found", { status: 404 });
    }

    // Remove the Infomation ID from associated News
    if (infomation.news) {
      await News.updateOne(
        { _id: infomation.news },
        { $pull: { information: infomationId } }
      );
    }
    

    // Delete the product
    await Infomation.findByIdAndDelete(infomationId);

    return new NextResponse("Article is deleted and references removed from news!", { status: 200 });
  } catch (error) {
    console.log("[infomationId_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};


export const POST = async (req: NextRequest, { params }: { params: { infomationId: string } }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    };

    await connectToDB();

    let infomation = await Infomation.findById(params.infomationId);

    if (!infomation) {
      return new NextResponse(JSON.stringify({ message: "infomation not found" }), { status: 404 });
    }

    const { subTitle, image, text, news } = await req.json();

    if (!subTitle || !image || !text || !news) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    infomation = await Infomation.findByIdAndUpdate(params.infomationId, { subTitle, image, text, news }, { new: true });

    await infomation.save();

    return  NextResponse.json(infomation, { status: 200 });

  } catch (error) {
    console.log("[infomationId_UPDATE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
