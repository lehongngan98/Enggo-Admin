"use client";
import Loader from '@/components/custom ui/Loader';
import NewsForm from '@/components/news/NewsForm';
import { NewsType } from '@/lib/types';
import { useEffect, useState } from 'react';


const NewsDetail = ({ params }: { params: { newsId: string } }) => {
  const [newsDetail, setNewsDetail] = useState<NewsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNewsDetail = async () => {
      try {
        const res = await fetch(`/api/news/${params.newsId}`, {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch newsId");
        }
        const data = await res.json();
        console.log("newsId_GET", data);
        
        setNewsDetail(data);
        setLoading(false);
      } catch (error) {
        console.error("[newsId_GET]", error);
      } finally {
        setLoading(false);
      }
    };
    getNewsDetail();
  }, [params.newsId]);
  console.log(newsDetail);


  return loading ? <Loader /> : (
    <NewsForm initialData={newsDetail} />
  )
}

export default NewsDetail
