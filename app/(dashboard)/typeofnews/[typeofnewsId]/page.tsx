"use client";

import { useEffect, useState } from "react";
import Loader from "../../../../components/custom ui/Loader";

import TypeOfNewsForm from "@/components/typeofnews/TypeOfNewsForm";
import { TypeOfNewsType } from "@/lib/types";

const TypeOfNewsDetail = ({ params }: { params: { typeofnewsId: string } }) => {
    const [typeofnews, settypeofnews] = useState<TypeOfNewsType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTypeOfNews = async () => {
            try {
                const res = await fetch(`/api/typeofnews/${params.typeofnewsId}`, {
                    method: "GET",
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch typeofnews");
                }
                const data = await res.json();
                settypeofnews(data);
                setLoading(false);
            } catch (error) {
                console.error("[typeofnews_GET]", error);
            } finally {
                setLoading(false);
            }
        };
        getTypeOfNews();
    },[params.typeofnewsId]);
    console.log(typeofnews);

    
    return loading ? <Loader /> : (
      <TypeOfNewsForm  initialData={typeofnews}/>
    )
};

export default TypeOfNewsDetail;
