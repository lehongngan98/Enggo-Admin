"use client";

import TopicVideoForm from "@/components/topicvideo/TopicVideoForm";
import { TopicVideoType } from "@/lib/types";
import { useEffect, useState } from "react";
import Loader from "../../../../components/custom ui/Loader";

const TopicVideoDetail = ({ params }: { params: { topicvideoId: string } }) => {
    const [topicVideo, setTopicVideo] = useState<TopicVideoType | null>(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const getTopicVideoDetail = async () => {
            try {
                const res = await fetch(`/api/topicvideo/${params.topicvideoId}`, {
                    method: "GET",
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch topicvideo");
                }
                const data = await res.json();
                setTopicVideo(data);
                setLoading(false);
            } catch (error) {
                console.error("[topicvideo_GET]", error);
            } finally {
                setLoading(false);
            }
        };
        getTopicVideoDetail();
    },[params.topicvideoId]);
    console.log(topicVideo);

    
    return loading ? <Loader /> : (
      <TopicVideoForm  initialData={topicVideo}/>
    )
};

export default TopicVideoDetail;
