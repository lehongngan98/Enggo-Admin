import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";




export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {

    await connectToDB();

    const product = await Product.findById(params.productId)
      .populate({path : "collections",model: Collection});

    if (!product) {
      return new NextResponse(JSON.stringify({ message: "Product not found" }), { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[productId_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};



export const DELETE = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const productId = params.productId;

    // Find the product to access its collections before deletion
    const product = await Product.findById(productId);

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // Remove the product ID from associated collections
    if (product.collections) {
      for (const collectionId of product.collections) {
        const collection = await Collection.findById(collectionId);
        if (collection) {
          // Filter out the deleted product's ID from the collection
          collection.products = collection.products.filter(
            (id: string) => id.toString() !== productId
          );
          await collection.save();
        }
      }
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);

    return new NextResponse("Product is deleted and references removed from collections!", { status: 200 });
  } catch (error) {
    console.log("[productId_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
