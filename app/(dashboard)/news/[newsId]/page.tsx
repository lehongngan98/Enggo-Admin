"use client";

import React, { useEffect, useState } from "react";
import Loader from "../../../../components/custom ui/Loader";

import NewsForm from "@/components/news/NewsForm";
import { NewsType } from "@/lib/types";

const NewsDetail = ({ params }: { params: { newsId: string } }) => {
    const [news, setNews] = useState<NewsType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      getNewDetail();
    }, []);
    console.log(news);

    const getNewDetail = async () => {
        try {
            const res = await fetch(`/api/news/${params.newsId}`, {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch news");
            }
            const data = await res.json();
            setNews(data);
            setLoading(false);
        } catch (error) {
            console.error("[newsId_GET]", error);
        } finally {
            setLoading(false);
        }
    };
    return loading ? <Loader /> : (
      <NewsForm  initialData={news}/>
    )
};

export default NewsDetail;
