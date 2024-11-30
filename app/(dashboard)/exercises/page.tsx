"use client";


import { DataTable } from "@/components/custom ui/DataTable";
import Loader from '@/components/custom ui/Loader';
import { columns } from "@/components/exercises/ExercisesColumn";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Exercises = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [exercises, setExercises] = useState([]);

    
    useEffect(() => {
        const getExercises = async () => {
            try {
                const res = await fetch("/api/exercises", {
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
        
        getExercises();
    },[]);

    console.log(exercises);

    return loading? <Loader/> :
    (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between ">
                <p className="text-heading3-bold">Bài tập theo chủ đề</p>
                <Button
                    className="ml-2 bg-blue-1 text-white"
                    onClick={() => {
                        router.push("/exercises/new");
                    }}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo mới
                </Button>
            </div>
            <Separator className=" bg-grey-1 mt-4" />
            <DataTable columns={columns} data={exercises} searchKey="topic"/>
            
             
        </div>
    );
};

export default Exercises;
