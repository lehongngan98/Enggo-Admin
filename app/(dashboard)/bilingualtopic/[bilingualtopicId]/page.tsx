"use client";

import BilingualTopicForm from "@/components/bilingualtopic/BilingualTopicForm";
import { BilingualTopicsType } from "@/lib/types";
import { useEffect, useState } from "react";
import Loader from "../../../../components/custom ui/Loader";

const BilingualTopicDetail = ({ params }: { params: { bilingualtopicId: string } }) => {
    const [bilingualtopic, setBilingualTopic] = useState<BilingualTopicsType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBilingualTopicDetail();
    }, []);
    console.log(bilingualtopic);

    const getBilingualTopicDetail = async () => {
        try {
            const res = await fetch(`/api/bilingualtopic/${params.bilingualtopicId}`, {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch bilingualtopic");
            }
            const data = await res.json();
            setBilingualTopic(data);
            setLoading(false);
        } catch (error) {
            console.error("[bilingualtopic_GET]", error);
        } finally {
            setLoading(false);
        }
    };
    return loading ? <Loader /> : (
      <BilingualTopicForm  initialData={bilingualtopic}/>
    )
};

export default BilingualTopicDetail;
