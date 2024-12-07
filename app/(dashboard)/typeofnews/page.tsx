"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from '@/components/custom ui/Loader';
import { columns } from "@/components/typeofnews/TypeOfNewsColumn";

const TypeOfNews = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [typeofnews, setTypeOfNews] = useState([]);

    
    useEffect(() => {
        const getTypeOfNews = async () => {
            try {
                const res = await fetch("/api/typeofnews", {
                    method: "GET",
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch typeofnews");
                }
                const data = await res.json();
                setTypeOfNews(data);
                setLoading(false);
            } catch (error) {
                console.error("[typeofnews_GET]", error);
            } finally {
                setLoading(false);
            }
        };
        getTypeOfNews();
    },[]);

    console.log(typeofnews);

    return  loading ? <Loader/> :
    (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between ">
                <p className="text-heading3-bold">Loại tin tức</p>
                <Button
                    className="ml-2 bg-blue-1 text-white"
                    onClick={() => {
                        router.push("/typeofnews/new");
                    }}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm mới
                </Button>
            </div>
            <Separator className=" bg-grey-1 mt-4" />
            <DataTable columns={columns} data={typeofnews} searchKey="title"/>
        </div>
    );
};

export default TypeOfNews;
