"use client";

import StoryForm from "@/components/story/StoryForm";
import { StoryType } from "@/lib/types";
import { useEffect, useState } from "react";
import Loader from "../../../../components/custom ui/Loader";

const StoryDetail = ({ params }: { params: { storyId: string } }) => {
    const [story, setStory] = useState<StoryType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStory = async () => {
            try {
                const res = await fetch(`/api/story/${params.storyId}`, {
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
        getStory();
    },[params.storyId]);
    console.log(story);

    
    return loading ? <Loader /> : (
      <StoryForm  initialData={story}/>
    )
};

export default StoryDetail;
