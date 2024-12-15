"use client";
import { DataTable } from '@/components/custom ui/DataTable';
import Loader from '@/components/custom ui/Loader';
import { columns } from '@/components/news/NewsColumn';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { NewsType } from '@/lib/types';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const  News = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<NewsType[]>([]);

  useEffect(() => {
    getNews();
  },[]);

  const getNews = async () => {
    try {
      const res = await fetch("/api/news",{
        method: "GET",       
      });

      const data = await res.json();
      setNews(data);
      setLoading(false);
    } catch (error) {
      console.error("news_GET",error);

    }
  };
  return loading ? <Loader /> : (
    <div className="px-10 py-5">
            <div className="flex items-center justify-between ">
                <p className="text-heading3-bold">Tin tức</p>
                <Button
                    className="ml-2 bg-blue-1 text-white"
                    onClick={() => {
                        router.push("/news/new");
                    }}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm mới
                </Button>
            </div>
            <Separator className=" bg-grey-1 mt-4" />
            <DataTable columns={columns} data={news} searchKey="content"/>
        </div>
  )
}

export default News
