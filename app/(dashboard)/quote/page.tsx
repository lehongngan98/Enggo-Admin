"use client";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from '@/components/custom ui/Loader';
import { columns } from "@/components/quote/QuoteColumn";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Quote = () => {
    const router = useRouter();
    const [ loading,setLoading] = useState(true);
    const [Quote, setQuote] = useState([]);

    const getQuote = async () => {
        try {
            const res = await fetch("/api/quote", {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch Quote");
            }
            const data = await res.json();
            setQuote(data);
            setLoading(false);
        } catch (error) {
            console.error("[Quote_GET]", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getQuote();
    },[]);

    console.log(Quote);

    return loading? <Loader/> :
    (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between ">
                <p className="text-heading3-bold">Trích Dẫn</p>
                <Button
                    className="ml-2 bg-blue-1 text-white"
                    onClick={() => {
                        router.push("/quote/new");
                    }}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm Trích Dẫn
                </Button>
            </div>
            <Separator className=" bg-grey-1 mt-4" />
            <DataTable columns={columns} data={Quote} searchKey="author"/>
            
             
        </div>
    );
};

export default Quote;
