"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/story/StoryColumn";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Story = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [story, setStory] = useState([]);

    const getStory = async () => {
        try {
            const res = await fetch("/api/story", {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch story");
            }
            const data = await res.json();
            setStory(data);
            setLoading(false);
        } catch (error) {
            console.error("[story_GET]", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getStory();
    }, []);

    console.log(story);

    return (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between ">
                <p className="text-heading3-bold">Story</p>
                <Button
                    className="ml-2 bg-blue-1 text-white"
                    onClick={() => {
                        router.push("/story/new");
                    }}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Story
                </Button>
            </div>
            <Separator className=" bg-grey-1 mt-4" />
            <DataTable columns={columns} data={story} searchKey="nameVn"/>
            
             
        </div>
    );
};

export default Story;
