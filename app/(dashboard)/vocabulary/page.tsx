"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import Loader from '@/components/custom ui/Loader';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { columns } from "@/components/vocabulary/VocabularyColumn";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Vocabulary = () => {
    const router = useRouter();
    const [loading,setLoading] = useState(true);
    const [Vocabulary, setVocabulary] = useState([]);

    const getVocabulary = async () => {
        try {
            const res = await fetch("/api/vocabulary", {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch Vocabulary");
            }
            const data = await res.json();
            setVocabulary(data);
            setLoading(false);
        } catch (error) {
            console.error("[Vocabulary_GET]", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getVocabulary();
    },[]);

    console.log(Vocabulary);

    return loading? <Loader/> :
    (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between ">
                <p className="text-heading3-bold">Từ Vựng</p>
                <Button
                    className="ml-2 bg-blue-1 text-white"
                    onClick={() => {
                        router.push("/vocabulary/new");
                    }}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm mới
                </Button>
            </div>
            <Separator className=" bg-grey-1 mt-4" />
            <DataTable columns={columns} data={Vocabulary} searchKey="titleEn"/>
            
             
        </div>
    );
};

export default Vocabulary;
