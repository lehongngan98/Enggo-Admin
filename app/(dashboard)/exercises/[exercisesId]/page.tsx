"use client";


import ExercisesForm from "@/components/exercises/ExercisesForm";
import { ExerciseType } from "@/lib/types";
import { useEffect, useState } from "react";
import Loader from "../../../../components/custom ui/Loader";

const ExercisesDetail = ({ params }: { params: { exercisesId: string } }) => {
    const [exercises, setExercises] = useState<ExerciseType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ExercisesDetail = async () => {
            try {
                const res = await fetch(`/api/exercises/${params.exercisesId}`, {
                    method: "GET",
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch exercises");
                }
                const data = await res.json();
                setExercises(data);
                setLoading(false);
            } catch (error) {
                console.error("[exercises_GET]", error);
            } finally {
                setLoading(false);
            }
        };
        ExercisesDetail();
    },[params.exercisesId]);
    

    
    return loading ? <Loader /> : (
      <ExercisesForm  initialData={exercises}/>
    )
};

export default ExercisesDetail;
