import Exercises from "@/lib/models/Exercises";
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

        const {title,background,Items } = await req.json();

        const existingCollection = await Exercises.findOne({title})

        if(existingCollection){
            return new NextResponse("Exercises already exists", { status: 400 });
        }

        if(!title || !background){
            return new NextResponse("Bad required", { status: 400 });
        }

        const newExercises = await Exercises.create({
            title,
            background,
            Items,        
        })

        await newExercises.save();

        console.log("New Exercises created:", newExercises); // Add this for debugging
        
        return new NextResponse(newExercises, { status: 201 });
        
    } catch (error) {
        console.log("[newExercises_POST] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const exercises = await Exercises.find().sort({ createdAt: "desc" });

        console.log("Fetched exercises:", exercises); // Add this for debugging

        return NextResponse.json(exercises, { status: 200 });
    } catch (error) {
        console.log("[exercises_GET] :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
