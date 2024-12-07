import Collection from "@/lib/models/Collection";
import News from "@/lib/models/News";
import TypeOfNews from "@/lib/models/TypeOfNews";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";




export const GET = async (req: NextRequest, { params }: { params: { newsId: string } }) => {
  try {

    await connectToDB();

    const news = await News.findById(params.newsId)
      .populate({path : "typeofnews",model: TypeOfNews});

    if (!news) {
      return new NextResponse(JSON.stringify({ message: "news not found" }), { status: 404 });
    }

    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.log("[newsId_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};



export const DELETE = async (req: NextRequest, { params }: { params: { newsId: string } }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const newsId = params.newsId;

    // Find the news to access its collections before deletion
    const news = await News.findById(newsId);

    if (!news) {
      return new NextResponse("news not found", { status: 404 });
    }

    // Remove the news ID from associated collections
    if (news.typeofnews) {
      for (const typeofnewsId of news.typeofnews) {
        const typeofnews = await TypeOfNews.findById(typeofnewsId);
        if (typeofnews) {
          // Filter out the deleted news's ID from the typeofnews
          typeofnews.news = typeofnews.news.filter(
            (id: string) => id.toString() !== newsId
          );
          await typeofnews.save();
        }
      }
    }

    // Use the News model to delete the news document
    await News.findByIdAndDelete(newsId);

    return new NextResponse("news is deleted and references removed from collections!", { status: 200 });
  } catch (error) {
    console.log("[newsId_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};


// Update a news
export const POST = async (req: NextRequest, { params }: { params: { newsId: string } }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const newsId = params.newsId;

    const { content, image, information, typeofnews } = await req.json();

    if (!content || !image || !information || !typeofnews) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const news = await News.findById(newsId);

    if (!news) {
      return new NextResponse("News not found", { status: 404 });
    }

    // Remove the news reference from the old TypeOfNews if it exists
    if (news.typeofnews && news.typeofnews.toString() !== typeofnews) {
      const oldTypeOfNews = await TypeOfNews.findById(news.typeofnews);
      if (oldTypeOfNews) {
        oldTypeOfNews.news = oldTypeOfNews.news.filter((id: string) => id.toString() !== newsId);
        await oldTypeOfNews.save();
      }
    }

    // Add the news reference to the new TypeOfNews
    const newTypeOfNews = await TypeOfNews.findById(typeofnews);
    if (!newTypeOfNews) {
      return new NextResponse("TypeOfNews not found", { status: 404 });
    }
    if (!newTypeOfNews.news.includes(newsId)) {
      newTypeOfNews.news.push(newsId);
      await newTypeOfNews.save();
    }

    // Update the news document
    const title = newTypeOfNews.title;

    const updatedNews = await News.findByIdAndUpdate(
      newsId,
      {
        title,
        content,
        image,
        information,
        typeofnews,
      },
      { new: true } // Return the updated document
    );

    if (!updatedNews) {
      return new NextResponse("News not found", { status: 404 });
    }

    return NextResponse.json(updatedNews, { status: 200 });
  } catch (error) {
    console.log("[newsId_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// export const POST = async (req: NextRequest, { params }: { params: { newsId: string } }) => {
//   try {
//     const { userId } = auth();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     await connectToDB();

//     const newsId = params.newsId;

//     const { content, image, information, typeofnews } = await req.json();

//     if (!content || !image || !information || !typeofnews) {
//       return new NextResponse("Bad Request", { status: 400 });
//     }

//     const typeOfNews = await TypeOfNews.findById(typeofnews);
//     const title = typeOfNews?.title;

//     const updatedNews = await News.findByIdAndUpdate(
//       newsId,
//       {
//         title,
//         content,
//         image,
//         information: information,
//         typeofnews
//       },
//       { new: true }
//     );

//     if (!updatedNews) {
//       return new NextResponse("news not found", { status: 404 });
//     }

//     return NextResponse.json(updatedNews, { status: 200 });
//   } catch (error) {
//     console.log("[newsId_PUT]", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// };