"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/news/NewsColumn";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const News = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);

    const getNews = async () => {
        try {
            const res = await fetch("/api/news", {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch news");
            }
            const data = await res.json();
            setNews(data);
            setLoading(false);
        } catch (error) {
            console.error("[news_GET]", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getNews();
    }, []);

    console.log(news);

    return (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between ">
                <p className="text-heading3-bold">Chủ Đề Tin Tức</p>
                <Button
                    className="ml-2 bg-blue-1 text-white"
                    onClick={() => {
                        router.push("/news/new");
                    }}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm Mới
                </Button>
            </div>
            <Separator className=" bg-grey-1 mt-4" />
            <DataTable columns={columns} data={news} searchKey="title"/>
        </div>
    );
};

export default News;
