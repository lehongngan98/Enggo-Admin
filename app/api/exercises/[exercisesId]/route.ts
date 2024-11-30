
import Exercise from "@/lib/models/Exercises";
import { connectToDB } from "@/lib/mongoDB"; // Kết nối cơ sở dữ liệu
import { auth } from "@clerk/nextjs/server"; // Xác thực từ Clerk
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { exercisesId: string } }
) => {
    try {
        await connectToDB();

        const exercises = await Exercise.findById(params.exercisesId);
        console.log("exercises :", exercises);
        

        if (!exercises) {
            return new NextResponse("exercises topic not found", { status: 404 });
        }

        return NextResponse.json(exercises, { status: 200 });
    } catch (error) {
        console.log("[exercisesId_GET_BY_ID] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};


export const DELETE = async (
  req: NextRequest,
  { params }: { params: { exercisesId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectToDB();

        const deletedExercises = await Exercise.findByIdAndDelete(params.exercisesId);

        if (!deletedExercises) {
            return new NextResponse("exercises not found", { status: 404 });
        }

        return new NextResponse("exercises deleted", { status: 200 });
    } catch (error) {
        console.log("[exercises_DELETE] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};



export const POST = async (
  req: NextRequest,
  { params }: { params: { exercisesId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectToDB();

        const { title,background,Items } = await req.json();

        if (!title || !background|| !Items || !Array.isArray(Items)) {
            return new NextResponse("All fields are required", { status: 400 });
        }

        const updatedexercises = await Exercise.findByIdAndUpdate(
            params.exercisesId,
            {title,background,Items },
            { new: true }
        );

        console.log("updatedexercises :",updatedexercises);
        

        if (!updatedexercises) {
            return new NextResponse("exercises not found", { status: 404 });
        }

        return NextResponse.json(updatedexercises, { status: 200 });
    } catch (error) {
        console.log("[exercises_PUT] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};


