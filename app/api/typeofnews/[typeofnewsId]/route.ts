import News from "@/lib/models/News";
import TypeOfNews from "@/lib/models/TypeOfNews";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { typeofnewsId: string } }) => {
  try {

    await connectToDB();

    const typeOfNews = await TypeOfNews.findById(params.typeofnewsId);

    if (!typeOfNews) {
      return new NextResponse(JSON.stringify({ message: "TypeOfNews not found" }), { status: 404 });
    }

    return  NextResponse.json(typeOfNews, { status: 200 });
  } catch (error) {
    console.log("[typeofnewsId_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (req: NextRequest, { params }: { params: { typeofnewsId: string } }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const { title } = await req.json();

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    // Update document using findByIdAndUpdate
    const updatedTypeOfNews = await TypeOfNews.findByIdAndUpdate(
      params.typeofnewsId,
      { title },
      { new: true } // Return the updated document
    );

    if (!updatedTypeOfNews) {
      return new NextResponse(JSON.stringify({ message: "TypeOfNews not found" }), { status: 404 });
    }

    return NextResponse.json(updatedTypeOfNews, { status: 200 });
  } catch (error) {
    console.log("[typeofnewsId_UPDATE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { typeofnewsId: string } }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const typeofnewsId = params.typeofnewsId;

    // Find the TypeOfNews document before deletion
    const typeOfNews = await TypeOfNews.findById(typeofnewsId);

    if (!typeOfNews) {
      return new NextResponse("TypeOfNews not found", { status: 404 });
    }

    // Remove references to this TypeOfNews in related News documents
    await News.updateMany(
      { typeofnews: typeofnewsId },
      { $unset: { typeofnews: "" } } // Remove the typeofnews field from related news
    );

    // Delete the TypeOfNews document
    await TypeOfNews.findByIdAndDelete(typeofnewsId);

    return new NextResponse("TypeOfNews is deleted and references removed from News!", { status: 200 });

  } catch (error) {
    console.log("[typeofnewsId_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};


// export const DELETE = async (req: NextRequest, { params }: { params: { typeofnewsId: string } }) => {
//   try {
//     const { userId } = auth();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     };

//     await connectToDB();

//     await TypeOfNews.findByIdAndDelete(params.typeofnewsId);

//     return new NextResponse("TypeOfNews is deleted!", { status: 200 });

//   } catch (error) {
//     console.log("[typeofnewsId_DELETE]", error);
//     return new NextResponse("Internal Server Error", { status: 500 });

//   }
// };