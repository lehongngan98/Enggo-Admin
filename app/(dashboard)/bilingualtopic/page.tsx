"use client";

import { columns } from "@/components/bilingualtopic/BilingualTopicColumn";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from '@/components/custom ui/Loader';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BilingualTopic = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [bilingualtopic, setBilingualTopic] = useState([]);

    
    useEffect(() => {
        const getBilingualTopic = async () => {
            try {
                const res = await fetch("/api/bilingualtopic", {
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
        
        getBilingualTopic();
    },[]);

    console.log(bilingualtopic);

    return loading? <Loader/> :
    (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between ">
                <p className="text-heading3-bold">Chủ đề song ngữ</p>
                <Button
                    className="ml-2 bg-blue-1 text-white"
                    onClick={() => {
                        router.push("/bilingualtopic/new");
                    }}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo mới
                </Button>
            </div>
            <Separator className=" bg-grey-1 mt-4" />
            <DataTable columns={columns} data={bilingualtopic} searchKey="topic"/>
            
             
        </div>
    );
};

export default BilingualTopic;
