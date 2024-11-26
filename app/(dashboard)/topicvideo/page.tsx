"use client";
import Loader from '@/components/custom ui/Loader';
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/topicvideo/TopicVideoColumn";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TopicVideo = () => {
    const router = useRouter();
    const [loading,setLoading] = useState(true);
    const [TopicVideo, setTopicVideo] = useState([]);

    const getTopicVideo = async () => {
        try {
            const res = await fetch("/api/topicvideo", {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch TopicVideo");
            }
            const data = await res.json();
            setTopicVideo(data);
            setLoading(false);
        } catch (error) {
            console.error("[TopicVideo_GET]", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getTopicVideo();
    }, []);

    console.log(TopicVideo);

    return loading? <Loader/> :
    (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between ">
                <p className="text-heading3-bold">Chủ Đề Video</p>
                <Button
                    className="ml-2 bg-blue-1 text-white"
                    onClick={() => {
                        router.push("/topicvideo/new");
                    }}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo mới
                </Button>
            </div>
            <Separator className=" bg-grey-1 mt-4" />
            <DataTable columns={columns} data={TopicVideo} searchKey="title"/>
            
             
        </div>
    );
};

export default TopicVideo;
